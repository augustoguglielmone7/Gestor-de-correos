import {Correo} from "../correos/Correos";

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
    export const favoritosONoLeidos = combinarOR(
        esFavorito, 
        esNoLeido
    );
