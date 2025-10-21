import { type Static, Type } from "@fastify/type-provider-typebox";

export const credencialesModel = Type.Object({
  username: Type.String({ minLength: 2 }),
  password: Type.String({ minLength: 2 }),
});

export type CredencialesModel = Static<typeof credencialesModel>;
