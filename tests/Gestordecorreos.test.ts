
import { describe, test, expect } from "vitest";
import { GestorCorreos } from "../menu.ts/servicios/Gestordecorreos";
import { Correo } from "../menu.ts/correos/Correos";
import { Contacto } from "../menu.ts/correos/Contacto";
describe("RF-07: gestión de borradores", () => {

    test("permite guardar un borrador incompleto", () => {
        const gestor = new GestorCorreos();
        const contacto = new Contacto("Ana", "ana@gmail.com");

        const correo = new Correo(
            "",
            "",
            1,
            [],
            contacto
        );

        gestor.guardarBorrador(correo);

        expect(gestor.obtenerBorradores()).toHaveLength(1);
    });


    test("no permite enviar un correo sin destinatarios", () => {
        const gestor = new GestorCorreos();
        const contacto = new Contacto("Ana", "ana@gmail.com");

        const correo = new Correo(
            "Hola",
            "Saludo",
            4,
            [],
            contacto
        );

        gestor.guardarBorrador(correo);

        expect(() => gestor.enviarCorreo(correo))
            .toThrow("Debe existir al menos un destinatario");
    });

});
