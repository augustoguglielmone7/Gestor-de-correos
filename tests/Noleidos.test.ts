import { describe, expect, test, beforeEach } from "vitest";
import { Contacto } from "../menu.ts/correos/Contacto";
import { Correo } from "../menu.ts/correos/Correos";
import { Filtro } from "../menu.ts/correos/Filtro";
import { GestorCarpetas } from "../menu.ts/servicios/Gestordecarpetas";
import { GestorFiltros } from "../menu.ts/servicios/Gestordefiltros";
import { esNoLeido } from "../menu.ts/servicios/Predicado";

describe("RF-08: correos leidos y no leidos", () => {

    let gestor: GestorCarpetas;
    let correo1: Correo;
    let correo2: Correo;
    const ana = new Contacto("Ana Gomez", "ana@ucp.edu.ar");
    const luis = new Contacto("Luis Perez", "luis@gmail.com");

    beforeEach(() => {
        gestor = new GestorCarpetas();
        correo1 = new Correo("Como estas", "Hola", 1, [luis], ana);
        correo2 = new Correo("Nos vemos", "Reunion", 2, [luis], ana);
        gestor.agregarRecibido(correo1);
        gestor.agregarRecibido(correo2);
    });

    test("se marca como leido y despues otra vez como no leido", () => {
        correo1.setLeido(true);
        expect(correo1.getLeido()).toBe(true);

        correo1.setLeido(false);
        expect(correo1.getLeido()).toBe(false);
    });

    test("el estado se mantiene al consultar la bandeja", () => {
        correo1.setLeido(true);

        expect(gestor.obtenerCarpeta("recibidos")[0]?.getLeido()).toBe(true);
    });

    test("devuelve los no leidos de una bandeja", () => {
        correo1.setLeido(true);

        expect(gestor.obtenerNoLeidos("recibidos")).toEqual([correo2]);
        expect(gestor.obtenerNoLeidos("enviados")).toEqual([]);
    });

    test("el cambio de estado se refleja en los filtros", () => {
        const filtros = new GestorFiltros();
        filtros.agregarFiltro(new Filtro("No leidos", esNoLeido));

        expect(filtros.aplicarFiltro("No leidos", gestor.obtenerCarpeta("recibidos"))).toHaveLength(2);

        correo2.setLeido(true);

        expect(filtros.aplicarFiltro("No leidos", gestor.obtenerCarpeta("recibidos"))).toEqual([correo1]);
    });
});
