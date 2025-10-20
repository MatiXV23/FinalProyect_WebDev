import {Type} from "@fastify/type-provider-typebox";
import { categoriaModel } from "./categoriaModel";

export const articuloModel = Type.Object({
    id_articulo: Type.Integer(),
    nombre: Type.String({maxLength: 28}),
    categoria: Type.Array(categoriaModel),
    descripcion: Type.String({maxLength: 280}),
    precio: Type.Integer(),
}, {
    title: "Esquema para articulo"
})
