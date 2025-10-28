import { type Static, Type } from "@fastify/type-provider-typebox";

export const departamentoModel = Type.Object({
  id_departamento: Type.Integer(),
  nombre: Type.String({ maxLength: 50 }),
});

export type Departamento = Static<typeof departamentoModel>;
