
import { Correo } from "../correos/Correos";
import { Filtro } from "../correos/Filtro";

export class GestorFiltros {

    private filtros: Filtro[] = [];

    public agregarFiltro(filtro: Filtro): void {

        if (this.filtros.some(f => f.getNombre() === filtro.getNombre())) {
            throw new Error("Ya existe un filtro con ese nombre.");
        }

        if (this.filtros.length >= 5) {
            throw new Error("No se pueden agregar más de cinco filtros.");
        }

        this.filtros.push(filtro);
    }

    public obtenerFiltros(): Filtro[] {
        return [...this.filtros];
    }
    public aplicarFiltro(nombre: string, correos: Correo[]): Correo[] {

    const filtro = this.filtros.find(
        f => f.getNombre() === nombre
    );

    if (!filtro) {
        throw new Error("El filtro no existe.");
    }

    return correos.filter(correo => filtro.aplicar(correo));
    }
}
