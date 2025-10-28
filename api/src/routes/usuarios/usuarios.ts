import { type FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { usuarioModel } from "../../models/market/usuarioModel.ts";
import { Type } from "@fastify/type-provider-typebox";
import { PC_NotImplemented } from "../../errors/errors.ts";

const usersRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener los usuarios",
        tags: ["Usuario"],
        description:
          "Ruta para obtener todos los usuarios. No hay requerimientos de uso",
        response: {
          200: Type.Array(usuarioModel),
        },
      },
    },
    async (req, rep) => {
      throw new PC_NotImplemented();
      return
    }
  );

  fastify.post(
    "",
    {
      schema: {
        summary: "Crear usuario",
        tags: ["Usuario"],
        description: "Ruta para crear usuarios. No hay requerimientos de uso",
        body: Type.Omit(usuarioModel, ["id_usuario"]),
        response: {
          201: usuarioModel,
        },
        security: [{ bearerAuth: [] }],
      },
      onRequest: [fastify.authenticate, fastify.isAdmin]
    },
    async (req, rep) => {
      throw new PC_NotImplemented();
      return
    }
  );
};

export default usersRoutes;
