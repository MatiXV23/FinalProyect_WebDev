import { type FastifyPluginAsync } from "fastify";
import { Type } from "@fastify/type-provider-typebox";
import { PC_NotImplemented } from "../../../../../../errors/errors.ts";
import { usuarioModel } from "../../../../../../models/market/usuarioModel.ts";
import { compraModel } from "../../../../../../models/market/compraModel.ts";
import { reseniaModel } from "../../../../../../models/market/reseniaModel.ts";


const compraUserByIdRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post(
    "",
    {
      schema: {
        summary: "Realizar una resenia sobre una compra que realizo un usuario",
        tags: ["Usuario"],
        body: reseniaModel,
        description:
          "Ruta para realizar una resenia sobre una compra de un usuario. Se requiere ser el usuario dueño.",
        params: Type.Intersect([Type.Pick(usuarioModel, ["id_usuario"]), Type.Pick(compraModel, ["id_compra"])]),
        response: {
          201: reseniaModel,
        },
        security: [{ bearerAuth: [] }],
      },
      onRequest: [fastify.authenticate, fastify.isAdminOrOwner],
    },
    async (req, rep) => {
      return new PC_NotImplemented();
      rep.code(201).send()
    }
  );
};

export default compraUserByIdRoutes;
