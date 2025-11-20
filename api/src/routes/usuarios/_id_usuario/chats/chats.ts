import { type FastifyPluginAsync } from "fastify";
import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { PC_NotImplemented } from "../../../../errors/errors.js";
import { usuarioModel } from "../../../../models/market/usuarioModel.js";
import { chatModel } from "../../../../models/market/chatModel.js";

const chatsByIdRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.addHook("onRequest", fastify.authenticate);
  fastify.addHook("preHandler", fastify.isOwner);

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
    },
    async (req, rep) => {
      return await fastify.ChatsDB.getAll(req.params.id_usuario);
    }
  );
  fastify.post(
    "",
    {
      schema: {
        summary: "Crear nuevo chat",
        tags: ["Usuario", "Chats"],
        description:
          "Ruta para crear un chat. Se requiere ser el usuario dueño.",
        params: Type.Pick(usuarioModel, ["id_usuario"]),
        body: Type.Omit(chatModel, ["id_chat"]),
        response: {
          201: chatModel,
        },
        security: [{ bearerAuth: [] }],
      },
    },
    async (req, rep) => {
      rep.code(201).send(await fastify.ChatsDB.create(req.body));
    }
  );
};

export default chatsByIdRoutes;
