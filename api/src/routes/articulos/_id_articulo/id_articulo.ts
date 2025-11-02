import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { articuloModel } from "../../../models/market/articuloModel.ts";

//necesito autorizacion, solo el admin puede moficar el artículo
const articuloByIdRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.put(
    "",
    {
      schema: {
        summary: "Modificar articulo",
        tags: ["Articulo"],
        description:
          "Ruta para modificar articulo. Se requiere ser el usuario dueño o ser un administrador",
        body: articuloModel,
        params: Type.Pick(articuloModel, ["id_articulo"]),
        response: {
          204: Type.Null(),
        },
        security: [{ bearerAuth: [] }],
      },
      onRequest: [fastify.authenticate, fastify.isAdmin],
    },
    async (req, rep) => {
      await fastify.ArticulosDB.update(req.params.id_articulo, req.body);
      rep.code(204).send();
    }
  );

  fastify.delete(
    "",
    {
      schema: {
        summary: "Eliminar articulo",
        tags: ["Articulo"],
        description:
          "Ruta para eliminar articulo. Se requiere ser el usuario dueño o ser un administrador",
        params: Type.Pick(articuloModel, ["id_articulo"]),
        response: {
          204: Type.Null(),
        },
        security: [{ bearerAuth: [] }],
      },
      onRequest: [fastify.authenticate, fastify.isAdmin],
    },
    async (req, rep) => {
      await fastify.ArticulosDB.delete(req.params.id_articulo);
      rep.code(204).send();
    }
  );
};

export default articuloByIdRoutes;
