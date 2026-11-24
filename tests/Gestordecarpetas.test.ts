
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

    test("permite mover un correo a eliminados", () => {
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
        gestor.moverA(1, "eliminados");

        expect(gestor.obtenerCarpeta("recibidos")).toHaveLength(0);
        expect(gestor.obtenerCarpeta("eliminados")).toHaveLength(1);
    });

    test("no permite mover un correo inexistente", () => {
        const gestor = new GestorCarpetas();

        expect(() => gestor.moverA(99, "eliminados"))
            .toThrow("El correo no existe.");
    });
    test("Permite restaurar un correo de eliminados a recibidos", () => {
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
        gestor.moverA(1, "eliminados");
        gestor.moverA(1, "recibidos");

        expect(gestor.obtenerCarpeta("recibidos")).toHaveLength(1);
        expect(gestor.obtenerCarpeta("eliminados")).toHaveLength(0);
    });
    test("No permitir mover a una carpeta inexistente", () => {
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

        expect(() => gestor.moverA(1, "inexistente"))
            .toThrow("La carpeta de destino no existe.");
    });
    test("cada usuario tiene sus propias bandejas", () => {
       const bandejaUsuario1 = new GestorCarpetas();
       const bandejaUsuario2 = new GestorCarpetas();

       const remitente = new Contacto("Juan Pérez", "juan@gmail.com");
       const usuario1 = new Contacto("Juana López", "juana@gmail.com");
       const usuario2 = new Contacto("Pedro Gómez", "pedro@gmail.com");

       const correo1 = new Correo(
          "Mensaje para Juana",
           "Hola Juana",
           1,
           [usuario1],
           remitente
        );

        const correo2 = new Correo(
          "Mensaje para Pedro",
           "Hola Pedro",
           2,
           [usuario2],
           remitente
        );

        bandejaUsuario1.agregarRecibido(correo1);
        bandejaUsuario2.agregarRecibido(correo2);

        expect(bandejaUsuario1.obtenerCarpeta("recibidos")).toEqual([correo1]);
        expect(bandejaUsuario2.obtenerCarpeta("recibidos")).toEqual([correo2]);
    });
    test("cada usuario puede recibir 100 correos en su propia bandeja", () => {
        const bandejaUsuario1 = new GestorCarpetas();
        const bandejaUsuario2 = new GestorCarpetas();

        const remitente = new Contacto("Juan Pérez", "juan@gmail.com");
        const usuario1 = new Contacto("Juana López", "juana@gmail.com");
        const usuario2 = new Contacto("Pedro Gómez", "pedro@gmail.com");

        for (let i = 1; i <= 100; i++) {
            const correo1 = new Correo(
               `Mensaje ${i} para Juana`,
                `Asunto ${i}`,
                i,
                [usuario1],
                remitente
            );

            const correo2 = new Correo(
                `Mensaje ${i} para Pedro`,
                `Asunto ${i}`,
                i + 100,
               [usuario2],
               remitente
            );

            bandejaUsuario1.agregarRecibido(correo1);
            bandejaUsuario2.agregarRecibido(correo2);
        }

       expect(bandejaUsuario1.obtenerCarpeta("recibidos")).toHaveLength(100);
       expect(bandejaUsuario2.obtenerCarpeta("recibidos")).toHaveLength(100);
    }); 
});
