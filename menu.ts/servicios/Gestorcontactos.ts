import {Contacto} from "../correos/Contacto";
export class GestorContactos {

    private contactos: Contacto[] = [];

    public agregarContacto(contacto: Contacto): void {
     const existe = this.contactos.some
        (c => c.getEmail() === contacto.getEmail()
     );
     if (existe) {throw new Error("Ya existe un contacto con ese email");
     }
     this.contactos.push(contacto)
    };
    public obtenerContactos(): Contacto[] {
        return [...this.contactos];
    }
    public buscarContacto (email: string): Contacto | undefined {
        return this.contactos.find(c => c.getEmail() === email.trim().toLowerCase());
    }
    public modificarContacto(
        emailActual: string, 
        nuevoNombre: string,
       nuevoEmail: string
    ): void {

        const contacto = this.buscarContacto(emailActual);
        if (!contacto) {
            throw new Error("El contacto no existe");
        } 
      const emailNormalizado = nuevoEmail.trim().toLowerCase();
      const duplicado = this.contactos.some(
        c => c !== contacto &&
        c.getEmail() === emailNormalizado
      );

      if (duplicado) {
        throw new Error("Ya existe otro contacto con ese email");
     }

     contacto.setNombreCompleto(nuevoNombre);
     contacto.setEmail(nuevoEmail);
    }
    
    public eliminarContacto (email: string): void {
        const contacto = this.buscarContacto(email);
        if (!contacto) {
            throw new Error("El contacto no existe");
        }
        this.contactos = this.contactos.filter(c => c !== contacto);
    }
}
