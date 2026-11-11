import { Contacto } from "./Contacto";

export class Correo {

    private cuerpo: string;
    private asunto: string;
    private id: number;
    private destinatarios: Contacto[];
    private remitente: Contacto;
    private leido: boolean;
    private fecha: Date;
    private favorito: boolean;

    constructor(
        cuerpo: string,
        asunto: string,
        id: number,
        destinatarios: Contacto[],
        remitente: Contacto
    ) {
        this.cuerpo = cuerpo;
        this.asunto = asunto;
        this.id = id;
        this.destinatarios = [...destinatarios];
        this.remitente = remitente;
        this.leido = false;
        this.fecha = new Date();
        this.favorito = false;
    }
    public getAsunto(): string {
        return this.asunto;
    }
    public getId(): number {
        return this.id;
    }
    public getDestinatarios(): Contacto[] {
        return [...this.destinatarios];
    }
    public getRemitente(): Contacto {
        return this.remitente;
    }
    public getCuerpo(): string {
        return this.cuerpo;
    }
    public getLeido(): boolean {
        return this.leido;
    }
    public getFavorito(): boolean {
        return this.favorito;
    }   
    public setAsunto(asunto: string): void {
        this.asunto = asunto;
    }
    public setCuerpo(cuerpo: string): void {
        this.cuerpo = cuerpo;
    }
    public setDestinatarios(destinatarios: Contacto[]): void {
        this.destinatarios = [...destinatarios];
    }
    public setLeido(leido: boolean): void {
        this.leido = leido;
    }
    public setFavorito(favorito: boolean): void {
        this.favorito = favorito;
    }
}
