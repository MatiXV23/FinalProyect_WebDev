import { type Static, Type } from "@fastify/type-provider-typebox";

export const credencialesModel = Type.Object({
  email: Type.String({ minLength: 9 }),
  password: Type.String({ minLength: 2 }),
}, {
  examples: [
    {
      email: "agu@gmail.com",
      password:"pass",
    }
  ]
});

export type Credenciales = Static<typeof credencialesModel>;
