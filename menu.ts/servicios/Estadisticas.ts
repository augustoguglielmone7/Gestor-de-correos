import {Correo} from "../correos/Correos";

    export const obtenerAsuntos = (correos: Correo[]): string[] => {
        return correos.map(correo => correo.getAsunto());
    };

    export const filtrarCorreos = (
        correos: Correo[],
        condicion: (correo: Correo) => boolean
    ): Correo[] => {
        return correos.filter(condicion);
    };

    export const contarNoLeidos = (correos: Correo[]): number => {
        return correos.reduce(
            (total, correo) => correo.getLeido() ? total : total + 1,
            0
        );
    };

    export const contarPorRemitente = (correos: Correo[]): Record<string, number> => {
        return correos.reduce((conteo, correo) => {
            const email = correo.getRemitente().getEmail();
            conteo[email] = (conteo[email] ?? 0) + 1;
            return conteo;
        }, {} as Record<string, number>);
    };