import { type Static, Type } from "@fastify/type-provider-typebox";

export const mensajeModel = Type.Object({
  id_chat: Type.Integer(),
  id_enviador: Type.Integer(),
  fecha_mensaje: Type.String({format: 'date-time'}),
  contenido: Type.String({ maxLength: 120 }),
});

export type Mensaje = Static<typeof mensajeModel>;
