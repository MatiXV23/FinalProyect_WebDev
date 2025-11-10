import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { usuarioModel } from "../../../../../../models/market/usuarioModel.ts";
import { compraModel } from "../../../../../../models/market/compraModel.ts";
import {
  reseniaModel,
  reseniaPostModel,
} from "../../../../../../models/market/reseniaModel.ts";

const compraUserByIdRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.post(
    "",
    {
      schema: {
        summary: "Realizar una resenia sobre una compra que realizo un usuario",
        tags: ["Usuario"],
        body: reseniaPostModel,
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
      await fastify.ReseniaDB.create(req.body);
      rep.code(201).send();
    }
  );
};

export default compraUserByIdRoutes;
