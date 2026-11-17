import {Correo} from "../correos/Correos";
import {Contacto} from "../correos/Contacto";

    export const esFavorito = (correo: Correo): boolean => {
        return correo.getFavorito();
    }
    export const esLeido = (correo: Correo): boolean => {
        return correo.getLeido();
    }
    export const esNoLeido = (correo: Correo): boolean => {
        return !correo.getLeido();
    }

    export const combinarAND = (
       condicion1: (correo: Correo) => boolean,
       condicion2: (correo: Correo) => boolean
    ) => {
         return (correo: Correo): boolean =>
          condicion1(correo) && condicion2(correo);
    };


    export const combinarOR = (
          condicion1: (correo: Correo) => boolean,
        condicion2: (correo: Correo) => boolean
    ) => {
         return (correo: Correo): boolean =>
             condicion1(correo) || condicion2(correo);
    };

    export const combinarNOT = (
         condicion: (correo: Correo) => boolean
    ) => {
          return (correo: Correo): boolean =>
              !condicion(correo);
    };
    export const favoritosNoLeidos = combinarAND(
        esFavorito, 
        esNoLeido
    );
    export const todosLosCorreos = combinarOR(
        esLeido, 
        esNoLeido
    );
    export const noFavoritos = combinarNOT(esFavorito);
    
    export const asuntoContiene = (texto: string) => {
          return (correo: Correo): boolean =>
              correo.getAsunto().toLowerCase().includes(texto.toLowerCase());
    };

    export const cuerpoContiene = (texto: string) => {
          return (correo: Correo): boolean =>
              correo.getCuerpo().toLowerCase().includes(texto.toLowerCase());
    };
    export const urgenteOReuniones = combinarOR(
        asuntoContiene("urgente"),
        asuntoContiene("reunión")
    );

    const contactoContiene = (contacto: Contacto, texto: string): boolean => {
        return contacto.getNombreCompleto().toLowerCase().includes(texto.toLowerCase()) ||
            contacto.getEmail().includes(texto.toLowerCase());
    };

    export const remitenteContiene = (texto: string) => {
          return (correo: Correo): boolean =>
              contactoContiene(correo.getRemitente(), texto);
    };

    export const destinatarioContiene = (texto: string) => {
          return (correo: Correo): boolean =>
              correo.getDestinatarios().some(d => contactoContiene(d, texto));
    };

    export const contieneTexto = (texto: string) => {
          return combinarOR(
              combinarOR(asuntoContiene(texto), cuerpoContiene(texto)),
              combinarOR(remitenteContiene(texto), destinatarioContiene(texto))
          );
    };

    export const remitenteDelDominio = (dominio: string) => {
          return (correo: Correo): boolean =>
              correo.getRemitente().getEmail().endsWith(dominio.toLowerCase());
    };

    export const enviadoPor = (email: string) => {
          return (correo: Correo): boolean =>
              correo.getRemitente().getEmail() === email.trim().toLowerCase();
    };

    export const correosUcp = remitenteDelDominio("@ucp.edu.ar");

    export const academicosImportantes = combinarAND(
        correosUcp,
        asuntoContiene("examen")
    );

    export const pendientesDeRevision = combinarAND(
        esNoLeido,
        cuerpoContiene("entrega")
    );

    export const paraSeguimiento = combinarAND(
        combinarOR(asuntoContiene("proyecto"), asuntoContiene("reunion")),
        combinarNOT(esLeido)
    );

    export const personalesPrioritarios = (email: string) => {
          return combinarAND(esFavorito, enviadoPor(email));
    };
