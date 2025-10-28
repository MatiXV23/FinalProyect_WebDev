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
          "Ruta para obtener un chat de un usuario.",
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

export default chatsByIdRoutes;
