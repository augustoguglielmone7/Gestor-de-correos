
import { describe, test, expect } from "vitest";
import { GestorFiltros } from "../menu.ts/servicios/Gestordefiltros";
import { Filtro } from "../menu.ts/correos/Filtro";
import { Correo } from "../menu.ts/correos/Correos";
import { Contacto } from "../menu.ts/correos/Contacto";

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
    test("aplica un filtro y devuelve solo los correos que cumplen la condición", () => {
        const gestor = new GestorFiltros();

        const filtro = new Filtro("Favoritos", correo => correo.getFavorito());

        gestor.agregarFiltro(filtro);
    });

    test("lanza un error cuando se intenta aplicar un filtro inexistente", () => {
         const gestor = new GestorFiltros();

         expect(() => gestor.aplicarFiltro("Inexistente", []))
             .toThrow("El filtro no existe.");
   });
    test("devuelve solamente los correos favoritos", () => {
         const gestor = new GestorFiltros();

         const contacto = new Contacto("Ana Gomez", "ana@gmail.com");

         const correoFavorito = new Correo(
              "Contenido 1",
              "Reunión",
              1,
              [contacto],
              contacto
        );

        const correoNormal = new Correo(
             "Contenido 2",
             "Trabajo",
             2,
             [contacto],
             contacto
        );

        correoFavorito.setFavorito(true);

             const filtro = new Filtro(
             "Favoritos",
             correo => correo.getFavorito()
        );

        gestor.agregarFiltro(filtro);

        const resultado = gestor.aplicarFiltro(
             "Favoritos",
             [correoFavorito, correoNormal]
        );

        expect(resultado).toHaveLength(1);
        expect(resultado[0]?.getId()).toBe(1);
   });

});
