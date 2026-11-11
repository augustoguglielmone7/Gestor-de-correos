import { describe, expect, test, beforeEach } from "vitest";
import { Contacto } from "../menu.ts/correos/Contacto";
import { Correo } from "../menu.ts/correos/Correos";
import { GestorContactos } from "../menu.ts/servicios/Gestorcontactos";

describe("RF-03: gestion de contactos", () => {

    let gestor: GestorContactos;
    let ana: Contacto;

    beforeEach(() => {
        gestor = new GestorContactos();
        ana = new Contacto("Ana Gomez", "ana@ucp.edu.ar");
        gestor.agregarContacto(ana);
    });

    test("no se puede crear un contacto con un email invalido", () => {
        expect(() => new Contacto("Ana Gomez", "ana.ucp.edu.ar")).toThrow("El email no es valido.");
        expect(() => new Contacto("Ana Gomez", "ana@ucp")).toThrow("El email no es valido.");
    });

    test("agrega contactos y los devuelve", () => {
        const luis = new Contacto("Luis Perez", "luis@gmail.com");
        gestor.agregarContacto(luis);

        expect(gestor.obtenerContactos()).toEqual([ana, luis]);
    });

    test("busca un contacto por su email", () => {
        expect(gestor.buscarContacto("ANA@ucp.edu.ar")).toEqual(ana);
        expect(gestor.buscarContacto("nadie@gmail.com")).toBeUndefined();
    });

    test("no permite dos contactos con el mismo email", () => {
        const repetido = new Contacto("Otra Ana", "Ana@UCP.edu.ar");

        expect(() => gestor.agregarContacto(repetido)).toThrow("Ya existe un contacto con ese email.");
        expect(gestor.obtenerContactos().length).toEqual(1);
    });

    test("modifica el nombre y el email de un contacto", () => {
        gestor.modificarContacto("ana@ucp.edu.ar", "Ana Maria Gomez", "anamaria@ucp.edu.ar");

        expect(ana.getNombreCompleto()).toEqual("Ana Maria Gomez");
        expect(ana.getEmail()).toEqual("anamaria@ucp.edu.ar");
    });

    test("no deja modificar el email por uno que ya usa otro contacto", () => {
        gestor.agregarContacto(new Contacto("Luis Perez", "luis@gmail.com"));

        expect(() => gestor.modificarContacto("ana@ucp.edu.ar", "Ana Gomez", "luis@gmail.com")).toThrow("Ya existe un contacto con ese email.");
    });

    test("elimina un contacto", () => {
        gestor.eliminarContacto("ana@ucp.edu.ar");

        expect(gestor.obtenerContactos()).toEqual([]);
    });

    test("eliminar un contacto no borra los correos donde aparece", () => {
        const luis = new Contacto("Luis Perez", "luis@gmail.com");
        const correo = new Correo("Como estas", "Hola", 1, [luis], ana);

        gestor.eliminarContacto("ana@ucp.edu.ar");

        expect(correo.getRemitente()).toEqual(ana);
    });
});
