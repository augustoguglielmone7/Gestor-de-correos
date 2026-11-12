
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
}
