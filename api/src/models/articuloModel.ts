import {type Static, Type} from "@fastify/type-provider-typebox";
import { categoriaModel } from "./categoriaModel.ts";

export const articuloModel = Type.Object({
    id_articulo: Type.Integer(),
    nombre: Type.String({maxLength: 28}),
    categorias: Type.Array(categoriaModel),
    descripcion: Type.String({maxLength: 280}),
    precio: Type.Integer(),
}, {
    title: "Esquema para articulo"
})

export type ArticuloModel = Static<typeof articuloModel>