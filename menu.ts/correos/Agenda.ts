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


