import { type FastifyPluginAsync } from "fastify";
import { Type } from "@fastify/type-provider-typebox";
import { PC_NotImplemented } from "../../../../errors/errors.ts";
import { usuarioModel } from "../../../../models/market/usuarioModel.ts";
import { chatModel } from "../../../../models/market/chatModel.ts";

const chatsByIdRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener chats",
        tags: ["Usuario", "Chats"],
        description:
          "Ruta para obtener los chats un usuario. Se requiere ser el usuario dueño.",
        params: Type.Pick(usuarioModel, ["id_usuario"]),
        response: {
          200: Type.Array(chatModel),
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
