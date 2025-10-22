import { type FastifyPluginAsync } from "fastify";
import { Type } from "@fastify/type-provider-typebox";
import { PC_NotImplemented } from "../../errors/errors.ts";
import { credencialesModel } from "../../models/credencialesModel.ts";
import type { SignOptions } from "@fastify/jwt";
import { usuarioModel } from "../../models/usuarioModel.ts";

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

  fastify.get(
    "",
    {
      schema: {
        summary: "Get User",
        description: "Devuelve el usuario logeado",
        tags: ["Auth"],
        response: {
          200: usuarioModel,
        },
        
      },
    },
    async (request, reply) => {
      return new PC_NotImplemented();
    }
  )
};

export default loginRoute;
