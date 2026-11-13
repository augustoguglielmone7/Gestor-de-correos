import { Correo } from "../correos/Correos";

export class GestorCorreos {

    private borradores: Correo[] = [];
    private enviados: Correo[] = [];

    public guardarBorrador(correo: Correo): void {
        this.borradores.push(correo);
    }

    
    public enviarCorreo(correo: Correo): void {

        if (!correo.getRemitente()) {
             throw new Error("El correo necesita un remitente");
        }

        if (!correo.getAsunto().trim()) {
          throw new Error("El asunto es obligatorio");
        }

        if (correo.getDestinatarios().length === 0) {
          throw new Error("Debe existir al menos un destinatario");
        }

        const yaEnviado = this.enviados.some(
             enviado => enviado.getId() === correo.getId()
        );

        if (yaEnviado) {
             throw new Error("El correo ya ha sido enviado");
        }

        const indice = this.borradores.findIndex(
             borrador => borrador.getId() === correo.getId()
        );

       if (indice === -1) {
             throw new Error("El correo no esta en borradores");
        }

        this.borradores.splice(indice, 1);
        this.enviados.push(correo);


    }
    public obtenerBorradores(): Correo[] {
        return [...this.borradores];
    }
    public obtenerEnviados(): Correo[] {
        return [...this.enviados];
    }
}

