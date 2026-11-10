import { Contacto } from "./Contacto";

export class Agenda {

    private contactos: Contacto[];

    constructor() {
        this.contactos = [];
    }

    public listar(): Contacto[] {
        return [...this.contactos];
    }

    public buscarPorEmail(email: string): Contacto | undefined {
        const buscado = email.trim().toLowerCase();
        return this.contactos.find(contacto => contacto.getEmail() === buscado);
    }

    public agregar(contacto: Contacto): void {
        if (this.buscarPorEmail(contacto.getEmail())) {
            throw new Error("Ya existe un contacto con ese email.");
        }
        this.contactos.push(contacto);
    }

    public modificar(email: string, nuevoNombre: string, nuevoEmail: string): void {
        const contacto = this.buscarPorEmail(email);
        if (!contacto) {
            throw new Error("El contacto no existe.");
        }
        const otro = this.buscarPorEmail(nuevoEmail);
        if (otro && otro !== contacto) {
            throw new Error("Ya existe un contacto con ese email.");
        }
        contacto.setNombreCompleto(nuevoNombre);
        contacto.setEmail(nuevoEmail);
    }

    public eliminar(email: string): void {
        const contacto = this.buscarPorEmail(email);
        if (!contacto) {
            throw new Error("El contacto no existe.");
        }
        this.contactos = this.contactos.filter(c => c !== contacto);
    }
}
