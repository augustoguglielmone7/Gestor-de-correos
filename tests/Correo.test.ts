import { describe,expect, test} from "vitest";
import { Contacto } from "../menu.ts/correos/Contacto";
import { Correo } from "../menu.ts/correos/Correos";

describe("RF-01: creacion de correos", () => {

    const ana = new Contacto("Ana Gomez", "ana@ucp.edu.ar");
    const luis = new Contacto("Luis Perez", "luis@gmail.com");
    const marta = new Contacto("Marta Diaz", "marta@gmail.com");

    test("guarda los datos con los que se crea", () => {
        const correo = new Correo("El examen es el lunes", "Examen final", 1, [luis, marta], ana);

        expect(correo.getId()).toEqual(1);
        expect(correo.getAsunto()).toEqual("Examen final");
        expect(correo.getCuerpo()).toEqual("El examen es el lunes");
        expect(correo.getRemitente()).toEqual(ana);
        expect(correo.getDestinatarios()).toEqual([luis, marta]);
    });

    test("empieza como no leido y sin ser favorito", () => {
        const correo = new Correo("Como estas", "Hola", 1, [luis], ana);

        expect(correo.getLeido()).toEqual(false);
        expect(correo.getFavorito()).toEqual(false);
    });

    test("dos correos se distinguen por su id", () => {
        const correo1 = new Correo("Como estas", "Hola", 1, [luis], ana);
        const correo2 = new Correo("Como estas", "Hola", 2, [luis], ana);

        expect(correo1.getId()).not.toEqual(correo2.getId());
    });

    test("no se pueden modificar los destinatarios desde afuera", () => {
        const correo = new Correo("Como estas", "Hola", 1, [luis], ana);

        correo.getDestinatarios().push(marta);

        expect(correo.getDestinatarios()).toEqual([luis]);
    });

    test("se pueden cambiar el asunto, el cuerpo y los destinatarios", () => {
        const correo = new Correo("", "", 1, [], ana);

        correo.setAsunto("Reunion");
        correo.setCuerpo("Nos juntamos el martes");
        correo.setDestinatarios([luis]);

        expect(correo.getAsunto()).toEqual("Reunion");
        expect(correo.getCuerpo()).toEqual("Nos juntamos el martes");
        expect(correo.getDestinatarios()).toEqual([luis]);
    });

    test("se puede marcar como leido y como favorito", () => {
        const correo = new Correo("Como estas", "Hola", 1, [luis], ana);

        correo.setLeido(true);
        correo.setFavorito(true);

        expect(correo.getLeido()).toEqual(true);
        expect(correo.getFavorito()).toEqual(true);
    });
});
