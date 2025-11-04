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
      await fastify.CategoriasDB.update(req.params.id_categoria, req.body);
      rep.code(204).send();
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
      await fastify.CategoriasDB.delete(req.params.id_categoria);
      rep.code(204).send();
    }
  );
};

export default categoriaRoutes;
