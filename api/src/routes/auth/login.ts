import { type FastifyPluginAsync } from "fastify";
import { Type } from "@fastify/type-provider-typebox";
import { PC_NotImplemented } from "../../errors/errors.ts";
import { credencialesModel } from "../../models/credencialesModel.ts";
import type { SignOptions } from "@fastify/jwt";

const loginRoute: FastifyPluginAsync = async (fastify, opts) => {
  fastify.post(
    "",
    {
      schema: {
        summary: "Login",
        description: "En esta ruta el usuario puede logearse",
        tags: ["Auth"],
        body: credencialesModel,
        response: {
          200: { token: Type.String() },
        },
      },
    },
    async (request, reply) => {
      return new PC_NotImplemented();
      // const cuenta = //metodo para ver si coinciden las credenciales

      //   const signOptions: SignOptions = {
      //     expiresIn: "8h",
      //     notBefore: 0,
      //   };
      //   return { token: fastify.jwt.sign(cuenta, signOptions) };
    }
  );
};

export default loginRoute;
