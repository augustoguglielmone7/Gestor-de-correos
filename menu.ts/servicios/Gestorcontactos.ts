import {Contacto} from "../correos/Contacto";
export class GestorContactos {

    private contactos: Contacto[] = [];

    public agregarContacto(contacto: Contacto): void {
     const existe = this.contactos.some
        (c => c.getEmail() === contacto.getEmail()
     );
     if (existe) {throw new Error("El contacto ya existe");
     }
     this.contactos.push(contacto)
    };
    public obtenerContactos(): Contacto[] {
        return [...this.contactos];
    }
    public buscarContactoPorEmail(email: string): Contacto | undefined {
        return this.contactos.find(c => c.getEmail() === email.trim().toLowerCase());
    }
    public eliminarContacto(email: string): void {
        const contacto = this.buscarContactoPorEmail(email);
        if (!contacto) {
            throw new Error("El contacto no existe");
        }
        

