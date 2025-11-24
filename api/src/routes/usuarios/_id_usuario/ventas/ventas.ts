import { type FastifyPluginAsync } from "fastify";
import {
  FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { PC_NotImplemented } from "../../../../errors/errors.js";
import { usuarioModel } from "../../../../models/market/usuarioModel.js";
import { compraModel } from "../../../../models/market/compraModel.js";

const ventasUserRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener las ventas que realizo un usuario",
        tags: ["Usuario"],
        description:
          "Ruta para obtener las ventas de un usuario. Se requiere ser el usuario dueño o ser un administrador",
        params: Type.Pick(usuarioModel, ["id_usuario"]),
        response: {
          200: Type.Array(compraModel),
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: [fastify.isAdminOrOwner],
      onRequest: [fastify.authenticate],
    },
    async (req, rep) => {
      const { id_usuario } = req.params;

      try {
        const ventas = await fastify.ComprasDB.getVentasByVendedor(id_usuario);
        rep.send(ventas);
      } catch (e) {
        throw e;
      }
    }
  );
};

export default ventasUserRoutes;
