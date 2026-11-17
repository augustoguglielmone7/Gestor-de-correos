import { describe, expect, test, beforeEach } from "vitest";
import { Contacto } from "../menu.ts/correos/Contacto";
import { Correo } from "../menu.ts/correos/Correos";
import { Filtro } from "../menu.ts/correos/Filtro";
import { GestorFiltros } from "../menu.ts/servicios/Gestordefiltros";
import {
    academicosImportantes,
    combinarAND,
    combinarNOT,
    combinarOR,
    correosUcp,
    esFavorito,
    paraSeguimiento,
    pendientesDeRevision,
    personalesPrioritarios
} from "../menu.ts/servicios/Predicado";

describe("RF-05: filtros complejos", () => {

    let gestor: GestorFiltros;
    let examen: Correo;
    let entrega: Correo;
    let reunion: Correo;
    let personal: Correo;

    const profe = new Contacto("Jose Fernandez", "jose@ucp.edu.ar");
    const luis = new Contacto("Luis Perez", "luis@gmail.com");
    const marta = new Contacto("Marta Diaz", "marta@gmail.com");

    beforeEach(() => {
        gestor = new GestorFiltros();
        examen = new Correo("Se toma el lunes", "Examen final", 1, [luis], profe);
        entrega = new Correo("La entrega es el viernes", "Proyecto AE4", 2, [luis], profe);
        reunion = new Correo("Nos juntamos a las 10", "Reunion de grupo", 3, [luis], marta);
        personal = new Correo("Cumple el sabado", "Cumple", 4, [luis], marta);
        personal.setFavorito(true);

        gestor.agregarFiltro(new Filtro("Correos de la UCP", correosUcp));
        gestor.agregarFiltro(new Filtro("Academicos importantes", academicosImportantes));
        gestor.agregarFiltro(new Filtro("Pendientes de revision", pendientesDeRevision));
        gestor.agregarFiltro(new Filtro("Para seguimiento", paraSeguimiento));
        gestor.agregarFiltro(new Filtro("Personales prioritarios", personalesPrioritarios("marta@gmail.com")));
    });

    test("cada filtro identifica los correos que cumplen su condicion", () => {
        const correos = [examen, entrega, reunion, personal];

        expect(gestor.aplicarFiltro("Correos de la UCP", correos)).toEqual([examen, entrega]);
        expect(gestor.aplicarFiltro("Academicos importantes", correos)).toEqual([examen]);
        expect(gestor.aplicarFiltro("Pendientes de revision", correos)).toEqual([entrega]);
        expect(gestor.aplicarFiltro("Para seguimiento", correos)).toEqual([entrega, reunion]);
        expect(gestor.aplicarFiltro("Personales prioritarios", correos)).toEqual([personal]);
    });

    test("los operadores AND, OR y NOT se evaluan correctamente", () => {
        const ucpYFavorito = combinarAND(correosUcp, esFavorito);
        const ucpOFavorito = combinarOR(correosUcp, esFavorito);
        const noUcp = combinarNOT(correosUcp);

        expect(ucpYFavorito(examen)).toBe(false);
        expect(ucpOFavorito(personal)).toBe(true);
        expect(noUcp(reunion)).toBe(true);
        expect(noUcp(examen)).toBe(false);
    });

    test("se reutilizan predicados existentes para armar un filtro nuevo", () => {
        const ucpFavoritos = new Filtro("UCP favoritos", combinarAND(correosUcp, esFavorito));
        examen.setFavorito(true);

        expect([examen, entrega, personal].filter(c => ucpFavoritos.aplicar(c))).toEqual([examen]);
    });

    test("un mismo filtro se aplica sobre distintas colecciones", () => {
        const recibidos = [examen, reunion];
        const enviados = [entrega, personal];

        expect(gestor.aplicarFiltro("Correos de la UCP", recibidos)).toEqual([examen]);
        expect(gestor.aplicarFiltro("Correos de la UCP", enviados)).toEqual([entrega]);
    });

    test("los cambios en los correos se reflejan al volver a aplicar el filtro", () => {
        const correos = [entrega, reunion];

        expect(gestor.aplicarFiltro("Para seguimiento", correos)).toHaveLength(2);

        reunion.setLeido(true);

        expect(gestor.aplicarFiltro("Para seguimiento", correos)).toEqual([entrega]);
    });

    test("aplicar filtros no modifica los correos", () => {
        gestor.aplicarFiltro("Pendientes de revision", [entrega]);

        expect(entrega.getLeido()).toBe(false);
        expect(entrega.getAsunto()).toEqual("Proyecto AE4");
    });
});