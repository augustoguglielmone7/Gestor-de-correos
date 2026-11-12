import { Correo } from "../correos/Correos";

export class Filtro {
    private nombre: string;
    private condicion: (correo: Correo) => boolean;

    constructor(
        nombre: string,
        condicion: (correo: Correo) => boolean
    ) {
        if (!nombre.trim()) {
            throw new Error("El nombre del filtro es obligatorio");
        }

        this.nombre = nombre;
        this.condicion = condicion;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public aplicar(correo: Correo): boolean {
        return this.condicion(correo);
    }
}
