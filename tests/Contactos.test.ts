import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
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

    it("no se puede crear un contacto con un email invalido", () => {
        assert.throws(() => new Contacto("Ana Gomez", "ana.ucp.edu.ar"));
        assert.throws(() => new Contacto("Ana Gomez", "ana@ucp"));
    });

    it("agrega contactos y los devuelve", () => {
        const luis = new Contacto("Luis Perez", "luis@gmail.com");
        gestor.agregarContacto(luis);

        assert.deepEqual(gestor.obtenerContactos(), [ana, luis]);
    });

    it("busca un contacto por su email", () => {
        assert.equal(gestor.buscarContacto("ANA@ucp.edu.ar"), ana);
        assert.equal(gestor.buscarContacto("nadie@gmail.com"), undefined);
    });

    it("no permite dos contactos con el mismo email", () => {
        const repetido = new Contacto("Otra Ana", "Ana@UCP.edu.ar");

        assert.throws(() => gestor.agregarContacto(repetido));
        assert.equal(gestor.obtenerContactos().length, 1);
    });

    it("modifica el nombre y el email de un contacto", () => {
        gestor.modificarContacto("ana@ucp.edu.ar", "Ana Maria Gomez", "anamaria@ucp.edu.ar");

        assert.equal(ana.getNombreCompleto(), "Ana Maria Gomez");
        assert.equal(ana.getEmail(), "anamaria@ucp.edu.ar");
    });

    it("no deja modificar el email por uno que ya usa otro contacto", () => {
        gestor.agregarContacto(new Contacto("Luis Perez", "luis@gmail.com"));

        assert.throws(() => gestor.modificarContacto("ana@ucp.edu.ar", "Ana Gomez", "luis@gmail.com"));
    });

    it("elimina un contacto", () => {
        gestor.eliminarContacto("ana@ucp.edu.ar");

        assert.deepEqual(gestor.obtenerContactos(), []);
    });

    it("eliminar un contacto no borra los correos donde aparece", () => {
        const luis = new Contacto("Luis Perez", "luis@gmail.com");
        const correo = new Correo("Como estas", "Hola", 1, [luis], ana);

        gestor.eliminarContacto("ana@ucp.edu.ar");

        assert.equal(correo.getRemitente(), ana);
    });
});
