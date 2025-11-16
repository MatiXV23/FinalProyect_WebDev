import { type FastifyPluginAsync } from "fastify";
import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { PC_NoAuthorized, PC_NotImplemented } from "../../../../errors/errors.ts";
import { usuarioModel } from "../../../../models/market/usuarioModel.ts";
import {
  type Compra,
  compraModel,
  compraPostModel,
} from "../../../../models/market/compraModel.ts";
import { ErrorSchema } from "../../../../models/common/errorModel.ts";

const comprasUserRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.addHook("onRequest", fastify.authenticate);
  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener las compras que realizo un usuario",
        tags: ["Usuario"],
        description:
          "Ruta para obtener las compras de un usuario. Se requiere ser el usuario dueño o ser un administrador",
        params: Type.Pick(usuarioModel, ["id_usuario"]),
        response: {
          200: Type.Array(compraModel),
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: [fastify.isAdminOrOwner],
    },
    async (req, rep) => {
      return await fastify.ComprasDB.getAll();
    }
  );

  fastify.post(
    "",
    {
      schema: {
        summary: "Comprar articulo",
        tags: ["Articulo", "Comprar"],
        description:
          "Ruta para modificar articulo. No hay requerimientos de uso, pero debo estar loggeado",
        body: Type.Pick(compraPostModel, ["id_articulo"]),
        params: Type.Pick(usuarioModel, ["id_usuario"]),
        response: {
          204: Type.Null(),
          404: ErrorSchema,
          403: ErrorSchema
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: async (req, rep) => {
        const {id_articulo} = req.body
        const articulo = await fastify.ArticulosDB.getById(id_articulo)
        if (articulo.id_vendedor === req.params.id_usuario) throw new PC_NoAuthorized("No puedes comprar un articulo que tu publicaste");
      }
    },
    async (req, rep) => {
      
      await fastify.ComprasDB.create({
          id_comprador: req.params.id_usuario,
          id_articulo: req.body.id_articulo
        });
      rep.code(204).send();
    }
  );
};

export default comprasUserRoutes;
