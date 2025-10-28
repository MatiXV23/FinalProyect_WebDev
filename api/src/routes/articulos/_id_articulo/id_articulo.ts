import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { articuloModel } from "../../../models/market/articuloModel.ts";
import { PC_NotImplemented } from "../../../errors/errors.ts";

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
      onRequest: [fastify.authenticate, fastify.isAdmin]
    },
    async (req, rep) => {
      throw new PC_NotImplemented();
      return 
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
      onRequest: [fastify.authenticate, fastify.isAdmin]
    },
    async (req, rep) => {
      throw new PC_NotImplemented();
      return
    }
  );
};

export default articuloByIdRoutes;
