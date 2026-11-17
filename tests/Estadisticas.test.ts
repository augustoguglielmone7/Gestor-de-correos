import { describe, expect, test, beforeEach } from "vitest";
import { Contacto } from "../menu.ts/correos/Contacto";
import { Correo } from "../menu.ts/correos/Correos";
import { GestorCarpetas } from "../menu.ts/servicios/Gestordecarpetas";
import { contarNoLeidos, contarPorRemitente, filtrarCorreos, obtenerAsuntos } from "../menu.ts/servicios/Estadisticas";
import { correosUcp } from "../menu.ts/servicios/Predicado";

describe("RF-10: procesamiento funcional y estadisticas", () => {

    let gestor: GestorCarpetas;
    const ana = new Contacto("Ana Gomez", "ana@ucp.edu.ar");
    const luis = new Contacto("Luis Perez", "luis@gmail.com");

    beforeEach(() => {
        gestor = new GestorCarpetas();
        gestor.agregarRecibido(new Correo("El examen es el lunes", "Examen", 1, [luis], ana));
        gestor.agregarRecibido(new Correo("Nos vemos", "Reunion", 2, [ana], luis));
        gestor.agregarRecibido(new Correo("Traigan la entrega", "Proyecto", 3, [luis], ana));
    });

    test("obtiene los asuntos de una bandeja con map", () => {
        expect(obtenerAsuntos(gestor.obtenerCarpeta("recibidos"))).toEqual(["Examen", "Reunion", "Proyecto"]);
    });

    test("obtiene los correos que cumplen una condicion con filter", () => {
        const resultado = filtrarCorreos(gestor.obtenerCarpeta("recibidos"), correosUcp);

        expect(resultado.map(c => c.getId())).toEqual([1, 3]);
    });

    test("cuenta los no leidos con reduce", () => {
        gestor.obtenerCarpeta("recibidos")[0]?.setLeido(true);

        expect(contarNoLeidos(gestor.obtenerCarpeta("recibidos"))).toEqual(2);
    });

    test("cuenta los correos de cada remitente", () => {
        expect(contarPorRemitente(gestor.obtenerCarpeta("recibidos"))).toEqual({
            "ana@ucp.edu.ar": 2,
            "luis@gmail.com": 1
        });
    });

    test("con una bandeja vacia devuelve resultados vacios", () => {
        expect(obtenerAsuntos(gestor.obtenerCarpeta("enviados"))).toEqual([]);
        expect(contarNoLeidos(gestor.obtenerCarpeta("enviados"))).toEqual(0);
        expect(contarPorRemitente(gestor.obtenerCarpeta("enviados"))).toEqual({});
    });
});
