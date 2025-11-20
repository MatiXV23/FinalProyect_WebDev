import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { usuarioModel } from "../../../../../../models/market/usuarioModel.js";
import { compraModel } from "../../../../../../models/market/compraModel.js";
import {
  Resenia,
  reseniaModel,
  type ReseniaPost,
  reseniaPostModel,
} from "../../../../../../models/market/reseniaModel.js";

const compraUserByIdRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.post(
    "",
    {
      schema: {
        summary: "Realizar una resenia sobre una compra que realizo un usuario",
        tags: ["Usuario"],
        body: Type.Omit(reseniaPostModel, ["id_vendedor", "id_articulo"]),
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
      const compra = await fastify.ComprasDB.getById(req.params.id_compra);

      const res: ReseniaPost = {
        comentario: req.body.comentario,
        reputacion: req.body.reputacion,
        id_vendedor: compra.id_vendedor,
        id_articulo: compra.id_articulo,
      };  

      const resenia = await fastify.ReseniaDB.create(res)
      await fastify.ComprasDB.postResenia(req.params.id_compra, resenia.id_resenia)
      rep.code(201).send();
    }
  );
};

export default compraUserByIdRoutes;
