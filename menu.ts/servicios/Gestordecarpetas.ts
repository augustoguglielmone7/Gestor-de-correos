
import { Correo } from "../correos/Correos";

export class GestorCarpetas {

    private recibidos: Correo[] = [];
    private enviados: Correo[] = [];
    private borradores: Correo[] = [];
    private eliminados: Correo[] = [];

    public agregarRecibido(correo: Correo): void {
        this.verificarDuplicado(correo);
        this.recibidos.push(correo);
    }

    public agregarBorrador(correo: Correo): void {
        this.verificarDuplicado(correo);
        this.borradores.push(correo);
    }

    public moverA(correoId: number, destino: string): void {
        const carpetas = [
            this.recibidos,
            this.enviados,
            this.borradores,
            this.eliminados
        ];

        const origen = carpetas.find(carpeta =>
            carpeta.some(correo => correo.getId() === correoId)
        );

        if (!origen) {
            throw new Error("El correo no existe.");
        }

        const correo = origen.find(c => c.getId() === correoId)!;

        const destinos: Record<string, Correo[]> = {
            recibidos: this.recibidos,
            enviados: this.enviados,
            borradores: this.borradores,
            eliminados: this.eliminados
        };

        const carpetaDestino = destinos[destino];

        if (!carpetaDestino) {
            throw new Error("La carpeta de destino no existe.");
        }

        if (origen === carpetaDestino) {
            throw new Error("El correo ya está en esa carpeta.");
        }

        origen.splice(origen.indexOf(correo), 1);
        carpetaDestino.push(correo);
    }

    public obtenerCarpeta(nombre: string): Correo[] {
        const carpetas: Record<string, Correo[]> = {
            recibidos: this.recibidos,
            enviados: this.enviados,
            borradores: this.borradores,
            eliminados: this.eliminados
        };

        const carpeta = carpetas[nombre];

        if (!carpeta) {
            throw new Error("La carpeta no existe.");
        }

        return [...carpeta];
    }

    private verificarDuplicado(correo: Correo): void {
        const todas = [
            ...this.recibidos,
            ...this.enviados,
            ...this.borradores,
            ...this.eliminados
        ];

        if (todas.some(c => c.getId() === correo.getId())) {
            throw new Error("El correo ya está registrado.");
        }
    }
}
