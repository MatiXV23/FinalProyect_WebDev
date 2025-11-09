export type Articulo = {
    id_articulo: number,
    id_vendedor: number,
    id_categoria: number,
    usado: boolean,
    con_envio: boolean,
    nombre: string,
    precio: number,
    moneda: MonedaEnum,
    descripcion: string,
    foto_url?: string,
}

export enum MonedaEnum {
    UYU = "UYU",
    USD = "USD"
}