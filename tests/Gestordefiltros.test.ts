
import { describe, test, expect } from "vitest";
import { GestorFiltros } from "../menu.ts/servicios/Gestordefiltros";
import { Filtro } from "../menu.ts/correos/Filtro";

describe("RF-05: gestión de filtros", () => {

    test("permite agregar un filtro", () => {
        const gestor = new GestorFiltros();
        const filtro = new Filtro("Favoritos", () => true);

        gestor.agregarFiltro(filtro);

        expect(gestor.obtenerFiltros().length).toBe(1);
    });

    test("no permite filtros con nombres repetidos", () => {
        const gestor = new GestorFiltros();

        gestor.agregarFiltro(new Filtro("Favoritos", () => true));

        expect(() => {
            gestor.agregarFiltro(new Filtro("Favoritos", () => false));
        }).toThrow("Ya existe un filtro con ese nombre.");
    });

    test("no permite agregar más de cinco filtros", () => {
        const gestor = new GestorFiltros();

        for (let i = 1; i <= 5; i++) {
            gestor.agregarFiltro(new Filtro(`Filtro ${i}`, () => true));
        }

        expect(() => {
            gestor.agregarFiltro(new Filtro("Filtro 6", () => true));
        }).toThrow("No se pueden agregar más de cinco filtros.");
    });

    test("devuelve una copia de los filtros", () => {
        const gestor = new GestorFiltros();

        gestor.agregarFiltro(new Filtro("Favoritos", () => true));

        const filtros = gestor.obtenerFiltros();
        filtros.pop();

        expect(gestor.obtenerFiltros().length).toBe(1);
    });

});
