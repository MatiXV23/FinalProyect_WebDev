import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { PC_NotImplemented } from "../../../errors/errors.ts";
import { categoriaModel } from "../../../models/market/categoriaModel.ts";

const categoriaRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.put(
    "",
    {
      schema: {
        summary: "Modificar categoria",
        tags: ["Categoria"],
        description:
          "Ruta para eliminar una categoria. Se requiere ser un administrador",
        body: categoriaModel,
        response: {
          204: Type.Null(),
        },
        security: [{ bearerAuth: [] }],
      },
      onRequest: [fastify.authenticate, fastify.isAdmin],
    },
    async (req, rep) => {
      throw new PC_NotImplemented();
      return;
    }
  );

  fastify.delete(
    "",
    {
      schema: {
        summary: "Eliminar categoria",
        tags: ["Categoria"],
        description:
          "Ruta para eliminar una categoria. Se requiere ser un administrador",
        response: {
          204: Type.Null(),
        },
        security: [{ bearerAuth: [] }],
      },
      onRequest: [fastify.authenticate, fastify.isAdmin],
    },
    async (req, rep) => {
      throw new PC_NotImplemented();
      return;
    }
  );
};

export default categoriaRoutes;
