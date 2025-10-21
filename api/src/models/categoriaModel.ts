import {Type} from "@fastify/type-provider-typebox";
import { type Static } from "@fastify/type-provider-typebox"; 

export const categoriaModel = Type.Object({
    id_categoria: Type.Integer(),
    nombre: Type.String(),
}, {
    title: "Esquema para categoria"
})

export type categoriaModel = Static<typeof categoriaModel>