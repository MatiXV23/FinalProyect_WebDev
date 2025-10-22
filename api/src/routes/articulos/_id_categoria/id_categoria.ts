import { type FastifyPluginAsync } from "fastify";
import { Type } from "@fastify/type-provider-typebox";
import { articuloModel } from "../../../models/articuloModel.ts";
import { PC_NotImplemented } from "../../../errors/errors.ts";

const articuloByCategoriaRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener articulos de una categoria",
        tags: ["Articulo"],
        description:
          "Ruta para obtener articulos por categoria. No hay requerimientos de uso",
        params: Type.Pick(articuloModel, ["categorias"]),
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
};

export default articuloByCategoriaRoutes;
