
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
    test("permite recuperar los borradores guardados", () => {
        const gestor = new GestorCorreos();
        const contacto = new Contacto("Ana", "ana@gmail.com");

        const correo = new Correo(
            "Hola",
            "Saludo",
            2,
            [contacto],
            contacto
        );

        gestor.guardarBorrador(correo);

        expect(gestor.obtenerBorradores()[0]?.getAsunto())
            .toBe("Saludo");
    });

    test("no permite enviar un correo sin asunto", () => {
        const gestor = new GestorCorreos();
        const contacto = new Contacto("Ana", "ana@gmail.com");

        const correo = new Correo(
            "Hola",
            "",
            3,
            [contacto],
            contacto
        );

        gestor.guardarBorrador(correo);

        expect(() => gestor.enviarCorreo(correo))
            .toThrow("El asunto es obligatorio");
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
    test("Permite envia un borrador completo", () => {
        const gestor = new GestorCorreos();
        const contacto = new Contacto("Ana", "ana@gmail.com");

        const correo = new Correo(
            "Hola",
            "Saludo",
            5,
            [contacto],
            contacto
        );

        gestor.guardarBorrador(correo);
        gestor.enviarCorreo(correo);

        expect(gestor.obtenerBorradores()).toHaveLength(0);
        expect(gestor.obtenerEnviados()).toHaveLength(1);
    });
    test("No permite enviar dos veces el mismo correo", () => {
        const gestor = new GestorCorreos();
        const contacto = new Contacto("Ana", "ana@gmail.com");

        const correo = new Correo(
            "Hola",
            "Saludo",
            5,
            [contacto],
            contacto
        );

        gestor.guardarBorrador(correo);
        gestor.enviarCorreo(correo);

        expect(() => gestor.enviarCorreo(correo))
            .toThrow("El correo ya ha sido enviado");
    });
});
