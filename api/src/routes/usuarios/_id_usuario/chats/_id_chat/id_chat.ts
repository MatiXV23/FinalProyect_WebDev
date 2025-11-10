import { type FastifyPluginAsync } from "fastify";
import { type FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox";
import { PC_Forbidden, PC_NotImplemented } from "../../../../../errors/errors.ts";
import { usuarioModel } from "../../../../../models/market/usuarioModel.ts";
import { chatModel } from "../../../../../models/market/chatModel.ts";

const chatsByIdRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.addHook("onRequest", fastify.authenticate)
  fastify.addHook("preHandler", fastify.isOwner)

  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener mensajes de un chat",
        tags: ["Usuario", "Chats"],
        description:
          "Ruta para obtener un chat de un usuario. Se requiere ser el usuario dueño.",
        params: Type.Intersect([
          Type.Pick(usuarioModel, ["id_usuario"]),
          Type.Pick(chatModel, ["id_chat"]),
        ]),
        response: {
          200: chatModel,
        },
        security: [{ bearerAuth: [] }],
      },
    },
    async (req, rep) => {
      const {id_usuario, id_chat} = req.params
      const chat = await fastify.ChatsDB.getById(id_chat);  

      if (chat.id_comprador !== id_usuario && chat.id_vendedor !== id_usuario) throw new PC_Forbidden()
      
      return chat
    }
  );
};

export default chatsByIdRoutes;
