import { type FastifyPluginAsync } from "fastify";
import { type FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox";
import { PC_NotImplemented } from "../../errors/errors.ts";
import { credencialesModel } from "../../models/market/credencialesModel.ts";
import type { SignOptions } from "@fastify/jwt";
import { type JWTUsuario, usuarioModel } from "../../models/market/usuarioModel.ts";

const loginRoute: FastifyPluginAsyncTypebox = async (fastify, opts) => {
  fastify.post(
    "",
    {
      schema: {
        summary: "Login",
        description: "En esta ruta el usuario puede logearse",
        tags: ["Auth"],
        body: credencialesModel,
        response: {
          200: Type.Object({ token: Type.String() }),
        },
      },
    },
    async (request, reply) => {
      const user = await fastify.UsuariosDB.getUserByCredentials(request.body)

      const userPayload: JWTUsuario = {
        email: user.email,
        id_usuario: user.id_usuario,
        id_departamento: user.id_departamento,
        is_admin: user.is_admin,
        nombres: user.nombres
      }

      const signOptions: SignOptions = {
        expiresIn: "8h",
        notBefore: 0,
      };
      const token = fastify.jwt.sign(userPayload, signOptions)
      return { token:  token };
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
        security: [{ bearerAuth: [] }],
      },
      onRequest: [fastify.authenticate],
    },
    async (request, reply) => {
      return await fastify.UsuariosDB.getById(request.user.id_usuario)
    }
  )
};

export default loginRoute;
