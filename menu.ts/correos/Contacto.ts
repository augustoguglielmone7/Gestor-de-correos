export class Contacto { 
    
    private nombrecompleto: string;
    private email: string;

    constructor(nombrecompleto: string, email: string) {
        this.validarNombre(nombrecompleto);
        this.validarEmail(email);

        this.nombrecompleto = nombrecompleto.trim();
        this.email = email.trim().toLowerCase();

    }
    private validarNombre(nombrecompleto: string): void {
        if (!nombrecompleto || nombrecompleto.trim().length === 0) {
            throw new Error("El nombre completo no puede estar vacío.");
        }
    }
    private validarEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("El email no es válido.");
        }
    }
    public getNombreCompleto(): string {
        return this.nombrecompleto;
    }
    public getEmail(): string {
        return this.email;
    }
    public setNombreCompleto(nombrecompleto: string): void {
        this.validarNombre(nombrecompleto);
        this.nombrecompleto = nombrecompleto.trim();
    }
   
}

