import { type FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox";
import { PC_NotImplemented } from "../../../../../../errors/errors.ts";
import { usuarioModel } from "../../../../../../models/market/usuarioModel.ts";
import { chatModel } from "../../../../../../models/market/chatModel.ts";
import { mensajeModel } from "../../../../../../models/market/mensajeModel.ts";

const mensajesRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.addHook("onRequest", fastify.authenticate)
  fastify.addHook("preHandler", fastify.isOwner)

  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener mensajes de un chat",
        tags: ["Usuario", "Chats"],
        description:
          "Ruta para obtener un chat de un usuario. Se requiere ser el usuario dueño ",
        params: Type.Intersect([
          Type.Pick(usuarioModel, ["id_usuario"]),
          Type.Pick(chatModel, ["id_chat"]),
        ]),
        response: {
          200: Type.Array(mensajeModel),
        },
        security: [{ bearerAuth: [] }],
      },
    },
    async (req, rep) => {
      return await fastify.ChatsDB.getMensajesFromChat(req.params.id_chat)
    }
  );

  fastify.post(
    "",
    {
      schema: {
        summary: "Enviar mensaje",
        tags: ["Usuario", "Chats"],
        description:
          "Ruta para enviar un mensaje a un usuario. Se requiere ser el usuario dueño ",
        body: Type.Omit(mensajeModel, ["fecha_mensaje", "id_chat"]),
        params: Type.Intersect([
          Type.Pick(usuarioModel, ["id_usuario"]),
          Type.Pick(chatModel, ["id_chat"]),
        ]),
        response: {
          201: mensajeModel,
        },
        security: [{ bearerAuth: [] }],
      },
    },
    async (req, rep) => {
      rep.code(201).send(await fastify.ChatsDB.createMensajeForChat(req.params.id_chat, req.body))
    }
  );
};

export default mensajesRoutes;
