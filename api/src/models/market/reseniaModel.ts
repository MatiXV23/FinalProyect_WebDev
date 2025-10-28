import {type Static, Type} from "@fastify/type-provider-typebox";

export const reseniaModel = Type.Object({
    id_resenia: Type.Integer(),
    id_vendedor: Type.Integer(),
    id_articulo: Type.Integer(),
    id_comprador: Type.Integer(),
    comentario: Type.String(),
    puntuacion: Type.Integer({minimum: 0, maximum: 5}),
})

export type Compra = Static<typeof reseniaModel>