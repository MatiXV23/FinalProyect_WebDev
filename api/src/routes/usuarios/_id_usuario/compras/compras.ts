import { type FastifyPluginAsync } from "fastify";
import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { PC_NotImplemented } from "../../../../errors/errors.ts";
import { usuarioModel } from "../../../../models/market/usuarioModel.ts";
import {
  compraModel,
  compraPostModel,
} from "../../../../models/market/compraModel.ts";

const comprasUserRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.addHook("onRequest", fastify.authenticate);
  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener las compras que realizo un usuario",
        tags: ["Usuario"],
        description:
          "Ruta para obtener las compras de un usuario. Se requiere ser el usuario dueño o ser un administrador",
        params: Type.Pick(usuarioModel, ["id_usuario"]),
        response: {
          200: Type.Array(compraModel),
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: [fastify.isAdminOrOwner],
    },
    async (req, rep) => {
      return await fastify.ComprasDB.getAll();
    }
  );

  fastify.post(
    "",
    {
      schema: {
        summary: "Comprar articulo",
        tags: ["Articulo", "Comprar"],
        description:
          "Ruta para modificar articulo. No hay requerimientos de uso, pero debo estar loggeado",
        body: Type.Omit(compraPostModel, ["id_compra", "id_resenia"]),
        params: Type.Pick(usuarioModel, ["id_usuario"]),
        response: {
          204: Type.Null(),
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: [fastify.isNotOwner],
    },
    async (req, rep) => {
      await fastify.ComprasDB.create(req.body);
      rep.code(204).send();
    }
  );
};

export default comprasUserRoutes;
