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
