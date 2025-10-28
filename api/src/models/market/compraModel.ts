import {type Static, Type} from "@fastify/type-provider-typebox";

export const compraModel = Type.Object({
    id_compra: Type.Integer(),
    id_articulo: Type.Integer(),
    id_comprador: Type.Integer(),
    id_vendedor: Type.Integer(),
    id_resenia: Type.Optional(Type.Integer())
})

export type Compra = Static<typeof compraModel>