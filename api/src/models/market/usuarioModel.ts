import { type Static, Type } from "@fastify/type-provider-typebox";

export const usuarioModel = Type.Object({
  id_usuario: Type.Integer(),
  email: Type.String(),
  nombres: Type.String({ maxLength: 50 }),
  apellidos: Type.String({ maxLength: 50 }),
  direccion: Type.String({ maxLength: 50 }),
  is_admin: Type.Boolean(),
  departamento: Type.String({ maxLength: 50 }),
  foto_url: Type.Optional(Type.String({ maxLength: 520 })),
  reputacion: Type.Optional(Type.Number({minimum: 0, maximum: 5})),
  articulos_carrito: Type.Optional(Type.Array(Type.Integer({description: "ids de los articulos en el carrito del usuario"})))
}, {examples: [
  {
    id_usuario: 1,
    email: "admin@correo.com",
    nombres: "admin",
    apellidos: "apellido",
    direccion: "Uruguay 1234",
    is_admin: true,
    departamento: "Montevideo",
  }
]});
export type Usuario = Static<typeof usuarioModel>;


export const JWTuserModel = Type.Object({
  id_usuario: Type.Integer(),
  email: Type.String(),
  nombres: Type.String({ maxLength: 50 }),
  is_admin: Type.Boolean(),
  departamento: Type.String({ maxLength: 50 }),
});
export type JWTUsuario = Static<typeof JWTuserModel>;
