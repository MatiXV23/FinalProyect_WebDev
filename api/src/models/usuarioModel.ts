import {Type} from "@fastify/type-provider-typebox";

export const usuarioModel = Type.Object({
    id: Type.Integer(),
    email: Type.String(),
    nombre: Type.String({maxLength: 28}),
    apellido: Type.String(),
    direccion: Type.String(),
})