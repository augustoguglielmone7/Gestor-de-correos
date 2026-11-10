import { Correo } from "../correos/Correos";

export class GestorCorreos {

    private borradores: Correo[] = [];
    private enviados: Correo[] = [];

    // Guardar un correo en borradores
    public guardarBorrador(correo: Correo): void {
        this.borradores.push(correo);
    }

    // RF2: Enviar un correo
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
