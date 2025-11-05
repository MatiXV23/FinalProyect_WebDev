import { type FastifyPluginAsync } from "fastify";
import { Type } from "@fastify/type-provider-typebox";
import { PC_NotImplemented } from "../../../../../errors/errors.ts";
import { usuarioModel } from "../../../../../models/market/usuarioModel.ts";
import { compraModel } from "../../../../../models/market/compraModel.ts";


const compraUserByIdRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener una compra que realizo un usuario",
        tags: ["Usuario"],
        description:
          "Ruta para obtener una compra de un usuario. Se requiere ser el usuario dueño o ser un administrador",
        params: Type.Intersect([Type.Pick(usuarioModel, ["id_usuario"]), Type.Pick(compraModel, ["id_compra"])]),
        response: {
          200: compraModel,
        },
        security: [{ bearerAuth: [] }],
      },
      onRequest: [fastify.authenticate],
      preHandler: [fastify.isAdminOrOwner]
    },
    async (req, rep) => {
      return new PC_NotImplemented();
    }
  );
};

export default compraUserByIdRoutes;
