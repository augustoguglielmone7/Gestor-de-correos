import { describe, expect, test, beforeEach } from "vitest";
import { Contacto } from "../menu.ts/correos/Contacto";
import { Correo } from "../menu.ts/correos/Correos";
import { GestorCorreos } from "../menu.ts/servicios/Gestordecorreos";

describe("RF-07: edicion de borradores", () => {

    let gestor: GestorCorreos;
    const ana = new Contacto("Ana Gomez", "ana@ucp.edu.ar");
    const luis = new Contacto("Luis Perez", "luis@gmail.com");
    const marta = new Contacto("Marta Diaz", "marta@gmail.com");

    beforeEach(() => {
        gestor = new GestorCorreos();
        gestor.guardarBorrador(new Correo("", "", 1, [], ana));
    });

    test("recupera un borrador por su id", () => {
        expect(gestor.obtenerBorrador(1).getId()).toEqual(1);
        expect(() => gestor.obtenerBorrador(99)).toThrow("El borrador no existe");
    });

    test("los cambios de la edicion quedan guardados en el borrador", () => {
        gestor.editarBorrador(1, "Resumen", "Te paso el resumen", [luis]);

        const borrador = gestor.obtenerBorrador(1);
        expect(borrador.getAsunto()).toEqual("Resumen");
        expect(borrador.getCuerpo()).toEqual("Te paso el resumen");
        expect(borrador.getDestinatarios()).toEqual([luis]);
    });

    test("un borrador incompleto no se puede enviar y sigue en borradores", () => {
        expect(() => gestor.enviarCorreo(gestor.obtenerBorrador(1))).toThrow("El asunto es obligatorio");
        expect(gestor.obtenerBorradores()).toHaveLength(1);
        expect(gestor.obtenerEnviados()).toEqual([]);
    });

    test("un borrador completado se envia a varios destinatarios", () => {
        gestor.editarBorrador(1, "Resumen", "Te paso el resumen", [luis, marta]);

        gestor.enviarCorreo(gestor.obtenerBorrador(1));

        expect(gestor.obtenerBorradores()).toEqual([]);
        expect(gestor.obtenerEnviados()[0]?.getDestinatarios()).toEqual([luis, marta]);
    });
});
