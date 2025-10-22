import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { PC_NotImplemented } from "../../../errors/errors.ts";
import { categoriaModel } from "../../../models/categoriaModel.ts";

const categoriaRoutes: FastifyPluginAsyncTypebox = async (fastify) => {

  fastify.delete(
    "",
    {
      schema: {
        summary: "Crear categoria",
        tags: ["Categoria"],
        description: "Ruta para eliminar una categoria",
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

export default categoriaRoutes;