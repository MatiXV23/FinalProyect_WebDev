import { type Static, Type } from "@fastify/type-provider-typebox";
// ACA HAY COSAS RARAS, TENDRIAMOS QUE CAMBIARLO Y CAMBIAR EN LA BASE DE DATOS
export const reseniaModel = Type.Object({
  id_resenia: Type.Integer(),
  id_vendedor: Type.Integer(),
  id_articulo: Type.Integer(),
  id_comprador: Type.Integer(),
  comentario: Type.String(),
  puntuacion: Type.Integer({ minimum: 0, maximum: 5 }),
});
export const reseniaPostModel = Type.Object({
  id_vendedor: Type.Integer(),
  comentario: Type.String(),
  reputacion: Type.Integer({ minimum: 0, maximum: 5 }),
});

export type Resenia = Static<typeof reseniaModel>;
export type ReseniaPost = Static<typeof reseniaPostModel>;
