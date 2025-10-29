import { type FastifyPluginAsync } from "fastify";
import { Type } from "@fastify/type-provider-typebox";
import { PC_NotImplemented } from "../../../../../errors/errors.ts";
import { usuarioModel } from "../../../../../models/market/usuarioModel.ts";
import { chatModel } from "../../../../../models/market/chatModel.ts";

const chatsByIdRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener chats",
        tags: ["Usuario", "Chats"],
        description:
          "Ruta para obtener un chat de un usuario. Se requiere ser el usuario dueño.",
        params: Type.Intersect([
          Type.Pick(usuarioModel, ["id_usuario"]),
          Type.Pick(chatModel, ["id_chat"]),
        ]),
        response: {
          204: Type.Null(),
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: [fastify.isOwner],
      onRequest: [fastify.authenticate],
    },
    async (req, rep) => {
      return new PC_NotImplemented();
    }
  );
};

export default chatsByIdRoutes;
