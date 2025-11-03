import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import {
  PC_Error,
  PC_NotFound,
  PC_NotImplemented,
} from "../../errors/errors.ts";
import { categoriaModel } from "../../models/market/categoriaModel.ts";
import { myPool } from "../../services/data/db_service.ts";

const categoriasRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener categorias",
        tags: ["Categoria"],
        description:
          "Ruta para obtener categorias. No hay requerimientos de uso",
        response: {
          200: Type.Array(categoriaModel),
        },
      },
    },
    async (req, rep) => {
      return await fastify.CategoriasDB.getAll();
    }
  );

  // fastify.post(
  //   "",
  //   {
  //     schema: {
  //       summary: "Crear categoria",
  //       tags: ["Categoria"],
  //       description:
  //         "Ruta para crear categoria. Se requiere ser un administrador",
  //       body: Type.Omit(categoriaModel, ["id_categoria"]),
  //       response: {
  //         201: categoriaModel,
  //       },
  //       // security: [{ bearerAuth: [] }],
  //     },
  //     // onRequest: [fastify.authenticate, fastify.isAdmin],
  //   },
  //   async (req, rep) => {
  //     try {
  //       const { nombre } = req.body;
  //       const resultado = await myPool.query(
  //         `INSERT INTO categorias (nombre) VALUES ($1) RETURNING id_categoria, nombre`,
  //         [nombre]
  //       );
  //       return rep.status(201).send("Usuario creado correctamente");
  //     } catch (error) {
  //       return rep.status(500).send({
  //         PC_Error,
  //       });
  //     }
  //   }
  // );
};

export default categoriasRoutes;
