import { type FastifyPluginAsync } from "fastify";
import { Type } from "@fastify/type-provider-typebox";
import { PC_NotImplemented } from "../../../../../../errors/errors.ts";
import { usuarioModel } from "../../../../../../models/market/usuarioModel.ts";
import { chatModel } from "../../../../../../models/market/chatModel.ts";
import { mensajeModel } from "../../../../../../models/market/mensajeModel.ts";


const mensajesRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener mensajes de un chat",
        tags: ["Usuario", "Chats"],
        description:
          "Ruta para obtener un chat de un usuario.",
        params: Type.Intersect([Type.Pick(usuarioModel, ["id_usuario"]), Type.Pick(chatModel,  ["id_chat"])]),
        response: {
          200: Type.Array(mensajeModel),
        },
        security: [{ bearerAuth: [] }],
      },
      onRequest: [fastify.authenticate, fastify.isOwner],
    },
    async (req, rep) => {
      return new PC_NotImplemented();
    }
  );

  fastify.post(
    "",
    {
      schema: {
        summary: "Enviar mensaje",
        tags: ["Usuario", "Chats"],
        description:
          "Ruta para enviar un mensaje a un usuario.",
        body: Type.Omit(mensajeModel, ["fecha_mensaje"]),
        params: Type.Intersect([Type.Pick(usuarioModel, ["id_usuario"]), Type.Pick(chatModel,  ["id_chat"])]),
        response: {
          204: Type.Null(),
        },
        security: [{ bearerAuth: [] }],
      },
      onRequest: [fastify.authenticate, fastify.isOwner],
    },
    async (req, rep) => {
      return new PC_NotImplemented();
    }
  );
};

export default mensajesRoutes;




