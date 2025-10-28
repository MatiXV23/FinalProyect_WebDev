import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { PC_NotImplemented } from "../../errors/errors.ts";
import { categoriaModel } from "../../models/market/categoriaModel.ts";

const categoriasRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener categorias",
        tags: ["Categoria"],
        description: "Ruta para obtener categorias.",
        response: {
          200: Type.Array(categoriaModel),
        },
      },
    },
    async (req, rep) => {
      throw new PC_NotImplemented();
      return
    }
  );

  fastify.post(
    "",
    {
      schema: {
        summary: "Crear categoria",
        tags: ["Categoria"],
        description: "Ruta para crear categoria",
        body: Type.Omit(categoriaModel, ["id_categoria"]),
        response: {
          201: categoriaModel,
        },
        security: [{ bearerAuth: [] }],
      },
      onRequest: [fastify.authenticate, fastify.isAdmin]
    },
    async (req, rep) => {
      throw new PC_NotImplemented();
      return 
    }
  );

};

export default categoriasRoutes;
