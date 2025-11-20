import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { PC_NotImplemented } from "../../../../../../errors/errors.js";
import { usuarioModel } from "../../../../../../models/market/usuarioModel.js";
import { chatModel } from "../../../../../../models/market/chatModel.js";
import {
  type Mensaje,
  mensajeModel,
} from "../../../../../../models/market/mensajeModel.js";

const mensajesRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.addHook("onRequest", fastify.authenticate);
  fastify.addHook("preHandler", fastify.isOwner);

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
      return await fastify.ChatsDB.getMensajesFromChat(req.params.id_chat);
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
        body: Type.Pick(mensajeModel, ["contenido"]),
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
      const msg: Partial<Mensaje> = {
        id_chat: req.params.id_chat,
        id_enviador: req.params.id_usuario,
        contenido: req.body.contenido,
      };
      const mensaje = await fastify.ChatsDB.createMensajeForChat(msg);

      const chat = await fastify.ChatsDB.getById(req.params.id_chat);

      const id_reciever =
        chat.id_comprador === req.params.id_usuario
          ? chat.id_vendedor
          : chat.id_comprador;
      fastify.notifyClient(id_reciever, {
        type: "nuevo_mensaje",
        id_chat: chat.id_chat,
      });
      rep.code(201).send(mensaje);
    }
  );
};

export default mensajesRoutes;
