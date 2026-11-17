import { describe, expect, test, beforeEach } from "vitest";
import { Contacto } from "../menu.ts/correos/Contacto";
import { Correo } from "../menu.ts/correos/Correos";
import { GestorCarpetas } from "../menu.ts/servicios/Gestordecarpetas";

describe("RF-06: eliminar y restaurar correos", () => {

    let gestor: GestorCarpetas;
    const ana = new Contacto("Ana Gomez", "ana@ucp.edu.ar");
    const luis = new Contacto("Luis Perez", "luis@gmail.com");

    beforeEach(() => {
        gestor = new GestorCarpetas();
        gestor.agregarRecibido(new Correo("Como estas", "Hola", 1, [luis], ana));
        gestor.agregarBorrador(new Correo("Te paso el resumen", "Resumen", 2, [ana], luis));
    });

    test("eliminar traslada el correo a eliminados", () => {
        gestor.eliminar(1);

        expect(gestor.obtenerCarpeta("recibidos")).toEqual([]);
        expect(gestor.obtenerCarpeta("eliminados").map(c => c.getId())).toEqual([1]);
    });

    test("restaurar devuelve el correo a su bandeja de origen", () => {
        gestor.eliminar(1);
        gestor.eliminar(2);

        gestor.restaurar(2);

        expect(gestor.obtenerCarpeta("borradores").map(c => c.getId())).toEqual([2]);
        expect(gestor.obtenerCarpeta("recibidos")).toEqual([]);
        expect(gestor.obtenerCarpeta("eliminados").map(c => c.getId())).toEqual([1]);
    });

    test("no permite eliminar dos veces el mismo correo", () => {
        gestor.eliminar(1);

        expect(() => gestor.eliminar(1)).toThrow("El correo ya esta eliminado.");
        expect(gestor.obtenerCarpeta("eliminados")).toHaveLength(1);
    });

    test("no permite restaurar un correo que no esta en eliminados", () => {
        expect(() => gestor.restaurar(1)).toThrow("El correo no esta en eliminados.");
    });

    test("no permite eliminar un correo inexistente", () => {
        expect(() => gestor.eliminar(99)).toThrow("El correo no existe.");
    });
});
