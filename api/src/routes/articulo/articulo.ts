import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { articuloModel } from "../../models/articuloModel.ts";
import { PC_NotImplemented } from "../../errors/errors.ts";

const articuloRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "/",
    {
      schema: {
        summary: "Obtener articulo",
        tags: ["Articulo"],
        description: "Ruta para obtener articulo. No hay requerimientos de uso",
        response: {
          200: Type.Array(articuloModel),
        },
      },
    },
    async (req, rep) => {
      return new PC_NotImplemented();
    }
  );

  fastify.post(
    "/",
    {
      schema: {
        summary: "Crear articulo",
        tags: ["Articulo"],
        description: "Ruta para crear articulo. No hay requerimientos de uso",
        body: Type.Omit(articuloModel, ["id_articulo"]),
        response: {
          201: articuloModel,
        },
      },
    },
    async (req, rep) => {
      return new PC_NotImplemented();
    }
  );
};

export default articuloRoutes;
