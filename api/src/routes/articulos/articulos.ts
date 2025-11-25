import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import {
  articuloModel,
  articuloQueryModel,
} from "../../models/market/articuloModel.js";
import { usuarioModel } from "../../models/market/usuarioModel.js";

const articuloRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener articulos",
        tags: ["Articulo"],
        querystring: articuloQueryModel,
        description:
          "Ruta para obtener articulos. No hay requerimientos de uso",
        response: {
          200: Type.Array(articuloModel),
        },
      },
    },
    async (req, rep) => {
      console.log({ params: req.query });
      if (req.query) return await fastify.ArticulosDB.findAll(req.query);
      return await fastify.ArticulosDB.getAll();
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
      const articulo = await fastify.ArticulosDB.create(req.body);
      rep.code(201).send(articulo);
    }
  );
};

export default articuloRoutes;
