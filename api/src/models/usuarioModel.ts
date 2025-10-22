import { type Static, Type } from "@fastify/type-provider-typebox";

export const usuarioModel = Type.Object({
  id_usuario: Type.Integer(),
  email: Type.String(),
  nombre: Type.String({ maxLength: 28 }),
  apellido: Type.String(),
  direccion: Type.String(),
  administrador: Type.Boolean(),
});

export type Usuario = Static<typeof usuarioModel>;
