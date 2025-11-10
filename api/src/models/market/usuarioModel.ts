import { type Static, Type } from "@fastify/type-provider-typebox";

export const usuarioModel = Type.Object({
  id_usuario: Type.Integer(),
  email: Type.String(),
  nombres: Type.String({ maxLength: 50 }),
  apellidos: Type.String({ maxLength: 50 }),
  direccion: Type.String({ maxLength: 50 }),
  is_admin: Type.Boolean(),
  id_departamento: Type.Integer(),
  nro_documento: Type.String({maxLength: 8}),
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
    id_departamento: "1",
    nro_documento: "12345678"
  }
]});
export type Usuario = Static<typeof usuarioModel>;

export const UsuarioQueryModel = Type.Optional(Type.Object({
  email: Type.Optional(Type.String()),
  nro_documento:  Type.Optional(Type.String({maxLength: 8})),
}))
export type UsuarioQuery = Static<typeof UsuarioQueryModel>;

export const JWTuserModel = Type.Object({
  id_usuario: Type.Integer(),
  email: Type.String(),
  nombres: Type.String({ maxLength: 50 }),
  is_admin: Type.Boolean(),
  id_departamento: Type.Integer(),
});
export type JWTUsuario = Static<typeof JWTuserModel>;


export const usuarioPostModel = Type.Object({
  email: Type.String(),
  nombres: Type.String({ maxLength: 50 }),
  apellidos: Type.String({ maxLength: 50 }),
  direccion: Type.String({ maxLength: 50 }),
  is_admin: Type.Boolean(),
  id_departamento: Type.Integer(),
  nro_documento: Type.String({maxLength: 8}),
  foto_url: Type.Optional(Type.String({ maxLength: 520 })),
  password: Type.String(),
}, {
  examples: [
    {
    email: "corrego@gmail.com",
    nombres: "ejemplo",
    apellidos: "apellido",
    direccion: "calle 1, dpto",
    is_admin: true,
    id_departamento: 3,
    nro_documento: "12345678",
    foto_url: "https://external-preview.redd.it/T1CjKMNYd4oViR3U1SHq7FRwM710QEnTyrboQRxuU0U.jpg?auto=webp&s=ae2c366ede78c8d798b0b78cb25cb9c5e951e088",
    password: "pass"
  }
  ]
});
export type UsuarioPost = Static<typeof usuarioPostModel>;