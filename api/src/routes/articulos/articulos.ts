import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { articuloModel } from "../../models/market/articuloModel.ts";
import { categoriaModel } from "../../models/market/categoriaModel.ts";
import { PC_NotImplemented } from "../../errors/errors.ts";

const articuloRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener articulos",
        tags: ["Articulo"],
        querystring: Type.Pick(categoriaModel, ["id_categoria"]),
        description:
          "Ruta para obtener articulos. No hay requerimientos de uso",
        response: {
          200: Type.Array(articuloModel),
        },
      },
    },
    async (req, rep) => {
      throw new PC_NotImplemented();
      return;
    }
  );

  fastify.post(
    "",
    {
      schema: {
        summary: "Crear articulo",
        tags: ["Articulo"],
        description:
          "Ruta para crear articulo. No hay requerimientos de uso, pero debo estar loggeado",
        body: Type.Omit(articuloModel, ["id_articulo"]),
        response: {
          201: articuloModel,
        },
        security: [{ bearerAuth: [] }],
      },
      onRequest: [fastify.authenticate],
    },
    async (req, rep) => {
      throw new PC_NotImplemented();
      return;
    }
  );
};

export default articuloRoutes;
