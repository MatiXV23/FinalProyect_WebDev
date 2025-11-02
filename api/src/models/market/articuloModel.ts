import { type Static, Type } from "@fastify/type-provider-typebox";
import { categoriaModel } from "./categoriaModel.ts";

export const articuloModel = Type.Object(
  {
    id_articulo: Type.Integer(),
    id_vendedor: Type.Integer(),
    id_categoria: Type.Integer(),
    usado: Type.Boolean(),
    con_envio: Type.Boolean(),
    nombre: Type.String({ maxLength: 28 }),
    precio: Type.Integer(),
    moneda: Type.Enum(["UYU", "USD"]),
    descripcion: Type.String({ maxLength: 180 }),
    foto_url: Type.Optional(Type.String({ maxLength: 520 })),
  },
  {
    title: "Esquema para articulo",
  }
);

export type Articulo = Static<typeof articuloModel>;
