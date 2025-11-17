import { type FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox";
import { PC_NotImplemented } from "../../../../errors/errors.ts";
import { usuarioModel } from "../../../../models/market/usuarioModel.ts";
import { reseniaModel } from "../../../../models/market/reseniaModel.ts";

const reseniasUserRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener las resenias que le realizaron a un usuario",
        tags: ["Usuario"],
        description: "Ruta para obtener las resenias de un usuario.",
        params: Type.Pick(usuarioModel, ["id_usuario"]),
        response: {
          200: Type.Array(reseniaModel),
        },
      },
    },
    async (req, rep) => {
      return await fastify.ReseniaDB.getAllUserRes(req.params.id_usuario);
    }
  );
  fastify.delete(
    "",
    {
      schema: {
        summary: "Eliminar una resenia que le realizaron a un usuario",
        tags: ["Usuario"],
        description:
          "Ruta para eliminar una resenia de un usuario. Se requiere ser un administrador",
        body: usuarioModel,
        params: Type.Pick(usuarioModel, ["id_usuario"]),
        response: {
          204: Type.Null(),
        },
        security: [{ bearerAuth: [] }],
      },
      onRequest: [fastify.authenticate, fastify.isAdmin],
    },
    async (req, rep) => {
      return new PC_NotImplemented();
    }
  );
};

export default reseniasUserRoutes;
