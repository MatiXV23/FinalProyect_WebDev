import { type FastifyPluginAsync } from "fastify";
import { Type } from "@fastify/type-provider-typebox";
import { PC_NotImplemented } from "../../../../errors/errors.js";
import { usuarioModel } from "../../../../models/market/usuarioModel.js";
import { compraModel } from "../../../../models/market/compraModel.js";
import { articuloModel } from "../../../../models/market/articuloModel.js";

const ventasUserRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener las ventas que realizo un usuario",
        tags: ["Usuario"],
        description:
          "Ruta para obtener las ventas de un usuario. Se requiere ser el usuario dueño o ser un administrador",
        params: Type.Pick(usuarioModel, ["id_usuario"]),
        200: Type.Array(
          Type.Object({
            compra: compraModel,
            articulo: articuloModel,
          })
        ),
        security: [{ bearerAuth: [] }],
      },
      preHandler: [fastify.isAdminOrOwner],
      onRequest: [fastify.authenticate],
    },
    async (req, rep) => {
      const { id_usuario } = req.params;

      try {
        const ventas = await fastify.ComprasDB.getVentasByVendedor(id_usuario);
        rep.send(ventas);
      } catch (e) {
        throw e;
      }
    }

    // const totalCompras = await fastify.ComprasDB.getAll();

    // if (!totalCompras || totalCompras.length === 0) return [];

    // const totalArticulos = await Promise.all(
    //   totalCompras.map((c) => fastify.ArticulosDB.getById(c.id_articulo))
    // );

    // const mezcla = totalCompras.map((compra, i) => ({
    //   compra,
    //   articulo: totalArticulos[i],
    // }));

    // const ventas = mezcla.filter(
    //   (item) => item.articulo.id_vendedor === idVendedor
    // );

    // return ventas;
    // }
  );
};

export default ventasUserRoutes;
