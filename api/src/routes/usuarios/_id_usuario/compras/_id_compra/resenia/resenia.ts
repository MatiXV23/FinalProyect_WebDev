import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { usuarioModel } from "../../../../../../models/market/usuarioModel.ts";
import { compraModel } from "../../../../../../models/market/compraModel.ts";
import {
  reseniaModel,
  type ReseniaPost,
  reseniaPostModel,
} from "../../../../../../models/market/reseniaModel.ts";

const compraUserByIdRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.post(
    "",
    {
      schema: {
        summary: "Realizar una resenia sobre una compra que realizo un usuario",
        tags: ["Usuario"],
        body: Type.Omit(reseniaPostModel, ["id_vendedor"]),
        description:
          "Ruta para realizar una resenia sobre una compra de un usuario. Se requiere ser el usuario dueño.",
        params: Type.Intersect([
          Type.Pick(usuarioModel, ["id_usuario"]),
          Type.Pick(compraModel, ["id_compra"]),
        ]),
        response: {
          201: reseniaModel,
        },
        security: [{ bearerAuth: [] }],
      },
      onRequest: [fastify.authenticate, fastify.isAdminOrOwner],
    },
    async (req, rep) => {
      const compra = await fastify.ComprasDB.getById(req.params.id_compra)

      const res: ReseniaPost = {
        comentario: req.body.comentario,
        reputacion: req.body.reputacion,
        id_vendedor: compra.id_vendedor,
        id_articulo: compra.id_articulo
      }
      
      rep.code(201).send(await fastify.ReseniaDB.create(res));
    }
  );
};

export default compraUserByIdRoutes;
