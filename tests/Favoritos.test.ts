import { describe, expect, test, beforeEach } from "vitest";
import { Contacto } from "../menu.ts/correos/Contacto";
import { Correo } from "../menu.ts/correos/Correos";
import { Filtro } from "../menu.ts/correos/Filtro";
import { GestorCarpetas } from "../menu.ts/servicios/Gestordecarpetas";
import { GestorFiltros } from "../menu.ts/servicios/Gestordefiltros";
import { combinarAND, correosUcp, esNoLeido } from "../menu.ts/servicios/Predicado";

describe("RF-09: correos favoritos", () => {

    let gestor: GestorCarpetas;
    let recibido: Correo;
    let borrador: Correo;
    let otro: Correo;
    const ana = new Contacto("Ana Gomez", "ana@ucp.edu.ar");
    const luis = new Contacto("Luis Perez", "luis@gmail.com");

    beforeEach(() => {
        gestor = new GestorCarpetas();
        recibido = new Correo("El examen es el lunes", "Examen", 1, [luis], ana);
        borrador = new Correo("Te paso el resumen", "Resumen", 2, [ana], luis);
        otro = new Correo("Como estas", "Hola", 3, [luis], ana);
        gestor.agregarRecibido(recibido);
        gestor.agregarBorrador(borrador);
        gestor.agregarRecibido(otro);
        recibido.setFavorito(true);
        borrador.setFavorito(true);
    });

    test("se marca y se desmarca como favorito", () => {
        otro.setFavorito(true);
        expect(gestor.obtenerFavoritos()).toHaveLength(3);

        otro.setFavorito(false);
        expect(gestor.obtenerFavoritos()).toHaveLength(2);
    });

    test("devuelve los favoritos de todas las bandejas sin duplicados", () => {
        expect(gestor.obtenerFavoritos()).toEqual([recibido, borrador]);
    });

    test("marcar como favorito no mueve el correo de su bandeja", () => {
        expect(gestor.obtenerCarpeta("recibidos")).toEqual([recibido, otro]);
        expect(gestor.obtenerCarpeta("borradores")).toEqual([borrador]);
    });

    test("se pueden combinar filtros sobre los favoritos", () => {
        const filtros = new GestorFiltros();
        filtros.agregarFiltro(new Filtro("UCP sin leer", combinarAND(correosUcp, esNoLeido)));

        expect(filtros.aplicarFiltro("UCP sin leer", gestor.obtenerFavoritos())).toEqual([recibido]);
    });

    test("un favorito eliminado no aparece hasta que se restaura", () => {
        gestor.eliminar(1);

        expect(gestor.obtenerFavoritos()).toEqual([borrador]);
        expect(recibido.getFavorito()).toBe(true);

        gestor.restaurar(1);

        expect(gestor.obtenerFavoritos()).toContain(recibido);
    });
});
