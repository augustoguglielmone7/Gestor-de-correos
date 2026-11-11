import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Contacto } from "../menu.ts/correos/Contacto";
import { Correo } from "../menu.ts/correos/Correos";

describe("RF-01: creacion de correos", () => {

    const ana = new Contacto("Ana Gomez", "ana@ucp.edu.ar");
    const luis = new Contacto("Luis Perez", "luis@gmail.com");
    const marta = new Contacto("Marta Diaz", "marta@gmail.com");

    it("guarda los datos con los que se crea", () => {
        const correo = new Correo("El examen es el lunes", "Examen final", 1, [luis, marta], ana);

        assert.equal(correo.getId(), 1);
        assert.equal(correo.getAsunto(), "Examen final");
        assert.equal(correo.getCuerpo(), "El examen es el lunes");
        assert.equal(correo.getRemitente(), ana);
        assert.deepEqual(correo.getDestinatarios(), [luis, marta]);
    });

    it("empieza como no leido y sin ser favorito", () => {
        const correo = new Correo("Como estas", "Hola", 1, [luis], ana);

        assert.equal(correo.getLeido(), false);
        assert.equal(correo.getFavorito(), false);
    });

    it("dos correos se distinguen por su id", () => {
        const correo1 = new Correo("Como estas", "Hola", 1, [luis], ana);
        const correo2 = new Correo("Como estas", "Hola", 2, [luis], ana);

        assert.notEqual(correo1.getId(), correo2.getId());
    });

    it("no se pueden modificar los destinatarios desde afuera", () => {
        const correo = new Correo("Como estas", "Hola", 1, [luis], ana);

        correo.getDestinatarios().push(marta);

        assert.deepEqual(correo.getDestinatarios(), [luis]);
    });

    it("se pueden cambiar el asunto, el cuerpo y los destinatarios", () => {
        const correo = new Correo("", "", 1, [], ana);

        correo.setAsunto("Reunion");
        correo.setCuerpo("Nos juntamos el martes");
        correo.setDestinatarios([luis]);

        assert.equal(correo.getAsunto(), "Reunion");
        assert.equal(correo.getCuerpo(), "Nos juntamos el martes");
        assert.deepEqual(correo.getDestinatarios(), [luis]);
    });

    it("se puede marcar como leido y como favorito", () => {
        const correo = new Correo("Como estas", "Hola", 1, [luis], ana);

        correo.setLeido(true);
        correo.setFavorito(true);

        assert.equal(correo.getLeido(), true);
        assert.equal(correo.getFavorito(), true);
    });
});
