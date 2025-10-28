import { type Static, Type } from "@fastify/type-provider-typebox";
import { mensajeModel } from "./mensajeModel.ts";

export const chatModel = Type.Object({
  id_chat: Type.Integer(),
  id_comprador: Type.Integer(),
  id_vendedor: Type.Integer(),
});

export type Chat = Static<typeof chatModel>;
