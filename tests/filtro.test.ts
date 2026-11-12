
import { describe, it, expect } from "vitest";
import { Filtro } from "../menu.ts/correos/Filtro";

describe("Clase Filtro", () => {

    it("debe crear un filtro con un nombre válido", () => {
        const filtro = new Filtro(
            "Favoritos",
            () => true
        );

        expect(filtro.getNombre()).toBe("Favoritos");
    });

    it("debe rechazar un filtro sin nombre", () => {
        expect(() => {
            new Filtro("", () => true);
        }).toThrow("El nombre del filtro es obligatorio");
    });

    it("debe aplicar correctamente una condición verdadera", () => {
        const filtro = new Filtro(
            "Todos",
            () => true
        );

        const resultado = filtro.aplicar({} as any);

        expect(resultado).toBe(true);
    });

});
