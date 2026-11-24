
import { describe, test, expect } from "vitest";
import { GestorCorreos } from "../menu.ts/servicios/Gestordecorreos";
import { Correo } from "../menu.ts/correos/Correos";
import { Contacto } from "../menu.ts/correos/Contacto";
import { Filtro, } from "../menu.ts/correos/Filtro";
import { combinarAND, contieneTexto} from "../menu.ts/servicios/Predicado";
import { GestorCarpetas } from "../menu.ts/servicios/Gestordecarpetas";
describe("RF-07: gestión de borradores", () => {

    test("permite guardar un borrador incompleto", () => {
        const gestor = new GestorCorreos();
        const contacto = new Contacto("Ana", "ana@gmail.com");

        const correo = new Correo(
            "",
            "",
            1,
            [],
            contacto
        );

        gestor.guardarBorrador(correo);

        expect(gestor.obtenerBorradores()).toHaveLength(1);
    });
    test("permite recuperar los borradores guardados", () => {
        const gestor = new GestorCorreos();
        const contacto = new Contacto("Ana", "ana@gmail.com");

        const correo = new Correo(
            "Hola",
            "Saludo",
            2,
            [contacto],
            contacto
        );

        gestor.guardarBorrador(correo);

        expect(gestor.obtenerBorradores()[0]?.getAsunto())
            .toBe("Saludo");
    });

    test("no permite enviar un correo sin asunto", () => {
        const gestor = new GestorCorreos();
        const contacto = new Contacto("Ana", "ana@gmail.com");

        const correo = new Correo(
            "Hola",
            "",
            3,
            [contacto],
            contacto
        );

        gestor.guardarBorrador(correo);

        expect(() => gestor.enviarCorreo(correo))
            .toThrow("El asunto es obligatorio");
    });


    test("no permite enviar un correo sin destinatarios", () => {
        const gestor = new GestorCorreos();
        const contacto = new Contacto("Ana", "ana@gmail.com");

        const correo = new Correo(
            "Hola",
            "Saludo",
            4,
            [],
            contacto
        );

        gestor.guardarBorrador(correo);

        expect(() => gestor.enviarCorreo(correo))
            .toThrow("Debe existir al menos un destinatario");
    });
    test("Permite envia un borrador completo", () => {
        const gestor = new GestorCorreos();
        const contacto = new Contacto("Ana", "ana@gmail.com");

        const correo = new Correo(
            "Hola",
            "Saludo",
            5,
            [contacto],
            contacto
        );

        gestor.guardarBorrador(correo);
        gestor.enviarCorreo(correo);

        expect(gestor.obtenerBorradores()).toHaveLength(0);
        expect(gestor.obtenerEnviados()).toHaveLength(1);
    });
    test("No permite enviar dos veces el mismo correo", () => {
        const gestor = new GestorCorreos();
        const contacto = new Contacto("Ana", "ana@gmail.com");

        const correo = new Correo(
            "Hola",
            "Saludo",
            5,
            [contacto],
            contacto
        );

        gestor.guardarBorrador(correo);
        gestor.enviarCorreo(correo);

        expect(() => gestor.enviarCorreo(correo))
            .toThrow("El correo ya ha sido enviado");
    });
    describe("RF-08: gestión de favoritos", () => {

    test("permite agregar un correo a favoritos", () => {
        const gestor = new GestorCorreos();
        const contacto = new Contacto("Ana", "ana@gmail.com");

        const correo = new Correo(
            "Hola",
            "Saludo",
            6,
            [contacto],
            contacto
        );

        gestor.agregarFavorito(correo);

        expect(gestor.obtenerFavoritos()).toHaveLength(1);
    });

    test("no mueve el correo de su bandeja original al marcarlo como favorito", () => {
        const gestor = new GestorCorreos();
        const contacto = new Contacto("Ana", "ana@gmail.com");

        const correo = new Correo(
            "Hola",
            "Saludo",
            7,
            [contacto],
            contacto
        );
        gestor.guardarBorrador(correo);
        gestor.enviarCorreo(correo);
        gestor.agregarFavorito(correo);

        expect(gestor.obtenerEnviados()).toHaveLength(1);
        expect(gestor.obtenerFavoritos()).toHaveLength(1);
    });
    test("permite enviar un correo a varios destinatarios", () => {
        const gestor = new GestorCorreos();
        const contacto1 = new Contacto("Juan", "juan@gmail.com");
        const contacto2 = new Contacto("Pedro", "pedro@gmail.com");
        const contacto3 = new Contacto("Maria", "maria@gmail.com");

        const correo = new Correo(
           "Hola a todos",
           "Reunion",
           1,
          [contacto1, contacto2, contacto3],
          contacto1
        );
        gestor.guardarBorrador(correo);
        gestor.enviarCorreo(correo);

        expect(gestor.getEnviados()).toContain(correo);
    });

    test("no permite agregar dos veces el mismo correo a favoritos", () => {
        const gestor = new GestorCorreos();
        const contacto = new Contacto("Ana", "ana@gmail.com");

        const correo = new Correo(
            "Hola",
            "Saludo",
            8,
            [contacto],
            contacto
        );

        gestor.agregarFavorito(correo);
        gestor.agregarFavorito(correo);

        expect(gestor.obtenerFavoritos()).toHaveLength(1);
    });

    test("permite quitar un correo de favoritos", () => {
        const gestor = new GestorCorreos();
        const contacto = new Contacto("Ana", "ana@gmail.com");

        const correo = new Correo(
            "Hola",
            "Saludo",
            9,
            [contacto],
            contacto
        );

        gestor.agregarFavorito(correo);
        gestor.quitarFavorito(correo);

        expect(gestor.obtenerFavoritos()).toHaveLength(0);
    });

    });
    test("no mueve un correo recibido de su bandeja original al marcarlo como favorito", () => {
       const gestor = new GestorCorreos();
        const contacto = new Contacto("Ana", "ana@gmail.com");

       const correo = new Correo(
         "Hola",
         "Saludo",
         10,
         [contacto],
         contacto
        );

        gestor.recibirCorreo(correo);
       gestor.agregarFavorito(correo);

       expect(gestor.obtenerRecibidos()).toHaveLength(1);
       expect(gestor.obtenerFavoritos()).toHaveLength(1);
    });
    test("quitar un favorito no elimina el correo de enviados", () => {
        const gestor = new GestorCorreos();
        const contacto = new Contacto("Ana", "ana@gmail.com");

        const correo = new Correo(
          "Hola",
           "Saludo",
           11,
           [contacto],
           contacto
       );

       gestor.guardarBorrador(correo);
       gestor.enviarCorreo(correo);
       gestor.agregarFavorito(correo);
       gestor.quitarFavorito(correo);

       expect(gestor.obtenerFavoritos()).toHaveLength(0);
       expect(gestor.obtenerEnviados()).toHaveLength(1);
   }); 
   test("envía un correo a 100 personas, lo guarda en sus bandejas y permite filtrarlo", () => {
     const gestor = new GestorCorreos();
     const remitente = new Contacto("Juan Pérez", "juan@gmail.com");

     const destinatarios: Contacto[] = [];
     const bandejas: GestorCarpetas[] = [];

     for (let i = 1; i <= 100; i++) {
        const destinatario = new Contacto(
            `Persona ${i}`,
            `persona${i}@gmail.com`
        );

        destinatarios.push(destinatario);
        bandejas.push(new GestorCarpetas());
     }

     const correo = new Correo(
        "Información importante",
        "Reunión general",
        100,
        destinatarios,
        remitente
     );

    // Guardar y enviar.
     gestor.guardarBorrador(correo);
     gestor.enviarCorreo(correo);

    // Distribuir el correo en las bandejas individuales.
     bandejas.forEach(bandeja => {
        bandeja.agregarRecibido(correo);
     });

    // Verificar que los 100 destinatarios lo recibieron.
     bandejas.forEach(bandeja => {
        expect(bandeja.obtenerCarpeta("recibidos")).toContain(correo);
     });

    // Elegir un destinatario.
     const indice = destinatarios.findIndex(
        contacto => contacto.getEmail() === "persona57@gmail.com"
     );

     expect(indice).not.toBe(-1);

     const bandejaElegida = bandejas[indice];

     if (!bandejaElegida) {
         throw new Error("No se encontró la bandeja del destinatario");
     }

    // Crear un filtro compuesto.
     const filtroCompuesto = new Filtro(
        "Correos importantes de Juan",
        combinarAND(
            (c) => c.getRemitente().getEmail() === "juan@gmail.com",
            contieneTexto("importante")
        )
     );

    // Comprobar el filtro y la bandeja individual.
     expect(filtroCompuesto.aplicar(correo)).toBe(true);
     expect(bandejaElegida.obtenerCarpeta("recibidos")).toContain(correo);
   });
});
