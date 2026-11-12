
import { describe, test, expect } from "vitest";
import { GestorCarpetas } from "..//menu.ts/servicios/Gestordecarpetas";
import { Correo } from "../menu.ts/correos/Correos";
import { Contacto } from "../menu.ts/correos/Contacto";

describe("RF-06 gestión de carpetas", () => {

    test("permite agregar un correo a recibidos", () => {
        const gestor = new GestorCarpetas();
        const contacto = new Contacto("Ana", "ana@gmail.com");

        const correo = new Correo(
            "Hola",
            "Saludo",
            1,
            [contacto],
            contacto
        );

        gestor.agregarRecibido(correo);

        expect(gestor.obtenerCarpeta("recibidos")).toHaveLength(1);
    });

    test("no permite agregar el mismo correo dos veces", () => {
        const gestor = new GestorCarpetas();
        const contacto = new Contacto("Ana", "ana@gmail.com");

        const correo = new Correo(
            "Hola",
            "Saludo",
            1,
            [contacto],
            contacto
        );

        gestor.agregarRecibido(correo);

        expect(() => gestor.agregarRecibido(correo))
            .toThrow("El correo ya está registrado.");
    });

