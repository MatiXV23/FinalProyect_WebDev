import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { articuloModel } from "../../../../models/market/articuloModel.ts";
import { PC_NotImplemented } from "../../../../errors/errors.ts";

//necesito autorizacion, cualquiera menos el owner
const articuloByIdRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.post(
    "",
    {
      schema: {
        summary: "Comprar articulo",
        tags: ["Articulo", "Comprar"],
        description:
          "Ruta para modificar articulo. No hay requerimientos de uso, pero debo estar loggeado",
        body: articuloModel,
        params: Type.Pick(articuloModel, ["id_articulo"]),
        response: {
          204: Type.Null(),
        },
        security: [{ bearerAuth: [] }],
      },
      onRequest: [fastify.authenticate],
      preHandler: [fastify.isNotOwner]
    },
    async (req, rep) => {
      throw new PC_NotImplemented();
      return;
    }
  );
};

export default articuloByIdRoutes;
