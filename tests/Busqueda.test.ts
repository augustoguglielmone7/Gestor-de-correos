import { describe, expect, test, beforeEach } from "vitest";
import { Contacto } from "../menu.ts/correos/Contacto";
import { Correo } from "../menu.ts/correos/Correos";
import { GestorCarpetas } from "../menu.ts/servicios/Gestordecarpetas";

describe("RF-04: busqueda de correos", () => {

    let gestor: GestorCarpetas;
    const ana = new Contacto("Ana Gomez", "ana@ucp.edu.ar");
    const luis = new Contacto("Luis Perez", "luis@gmail.com");
    const marta = new Contacto("Marta Diaz", "marta@gmail.com");

    beforeEach(() => {
        gestor = new GestorCarpetas();
        gestor.agregarRecibido(new Correo("El examen es el lunes", "Examen final", 1, [luis], ana));
        gestor.agregarRecibido(new Correo("Traigan la entrega impresa", "Proyecto", 2, [luis, marta], ana));
        gestor.agregarRecibido(new Correo("Nos vemos a las 10", "Reunion", 3, [marta], luis));
    });

    test("busca en el asunto sin distinguir mayusculas", () => {
        const resultado = gestor.buscar("EXAMEN");

        expect(resultado.map(c => c.getId())).toEqual([1]);
    });

    test("busca en el cuerpo con coincidencias parciales", () => {
        const resultado = gestor.buscar("impres");

        expect(resultado.map(c => c.getId())).toEqual([2]);
    });

    test("busca por nombre o email del remitente", () => {
        expect(gestor.buscar("gomez").map(c => c.getId())).toEqual([1, 2]);
        expect(gestor.buscar("ANA@ucp").map(c => c.getId())).toEqual([1, 2]);
    });

    test("busca por cualquiera de los destinatarios", () => {
        const resultado = gestor.buscar("marta");

        expect(resultado.map(c => c.getId())).toEqual([2, 3]);
    });

    test("un correo aparece una sola vez aunque coincida en varios campos", () => {
        const resultado = gestor.buscar("e");

        expect(resultado).toHaveLength(3);
    });

    test("devuelve una coleccion vacia si no hay coincidencias", () => {
        expect(gestor.buscar("vacaciones")).toEqual([]);
    });

    test("no modifica los correos originales", () => {
        gestor.buscar("examen");

        const correo = gestor.obtenerCarpeta("recibidos")[0];
        expect(correo?.getAsunto()).toEqual("Examen final");
        expect(gestor.obtenerCarpeta("recibidos")).toHaveLength(3);
    });

    test("buscar en una bandeja vacia devuelve una coleccion vacia", () => {
        const vacio = new GestorCarpetas();

        expect(vacio.buscar("examen")).toEqual([]);
    });
});