import {Correo} from "../correos/Correos";
export class Predicado {
    export const esFavorito = (correo: Correo): boolean => {
        return correo.getFavorito();
    }
    export const esLeido = (correo: Correo): boolean => {
        return correo.getLeido();
    }
    export const esNoLeido = (correo: Correo): boolean => {
        return !correo.getLeido();
    }

    