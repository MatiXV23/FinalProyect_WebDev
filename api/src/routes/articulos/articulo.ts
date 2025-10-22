import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { articuloModel } from "../../models/articuloModel.ts";
import { PC_NotImplemented } from "../../errors/errors.ts";

const articuloRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener articulos",
        tags: ["Articulo"],
        description: "Ruta para obtener articulos. No hay requerimientos de uso",
        response: {
          200: Type.Array(articuloModel),
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
        summary: "Crear articulo",
        tags: ["Articulo"],
        description: "Ruta para crear articulo. No hay requerimientos de uso",
        body: Type.Omit(articuloModel, ["id_articulo"]),
        response: {
          201: articuloModel,
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

export default articuloRoutes;
