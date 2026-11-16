import {describe, test, expect} from 'vitest';
import { esLeido, esNoLeido } from '../menu.ts/servicios/Predicado';
import { Correo } from '../menu.ts/correos/Correos';
import { Contacto } from "../menu.ts/correos/Contacto";


const remitente = new Contacto("Juan Perez", "juan@gmail.com");

const correo = new Correo(
    "Hola, ¿cómo estás?",
    "Saludo",
    1,
    [],
    remitente
);
describe("RF-08 - Lectura de correos", () => {

    test("Un correo nuevo debe comenzar como no leído", () => {
        expect(esNoLeido(correo)).toBe(true);
        expect(esLeido(correo)).toBe(false);
    });
    test("Un correo marcado como leído debe devolver true", () => {
        correo.setLeido(true);
        expect(esLeido(correo)).toBe(true); 
    });
    
});
