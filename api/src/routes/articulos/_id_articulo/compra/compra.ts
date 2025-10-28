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
          "Ruta para modificar articulo. Se requiere ser el usuario dueño o ser un administrador",
        body: articuloModel,
        params: Type.Pick(articuloModel, ["id_articulo"]),
        response: {
          204: Type.Null(),
        },
        security: [{ bearerAuth: [] }],
      },
      onRequest: [fastify.authenticate]
    },
    async (req, rep) => {
      throw new PC_NotImplemented();
      return 
    }
  );
};

export default articuloByIdRoutes;
