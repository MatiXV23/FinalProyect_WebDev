import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { departamentoModel } from "../../../models/market/departamentoModel.ts";

const departamentosRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener un departamento",
        tags: ["Departamentos"],
        description: "Ruta para obtener un usuario.",
        params: Type.Pick(departamentoModel, ["id_departamento"]),
        response: {
          200: departamentoModel,
        },
      },
    },
    async (req, rep) => {
      return fastify.DepartamentosDB.getById(req.params.id_departamento);
    }
  );

  fastify.put(
    "",
    {
      schema: {
        summary: "Modificar departamento",
        tags: ["Departamentos"],
        description:
          "Ruta para modificar un departamento. Se requiere ser un administrador",
        body: departamentoModel,
        params: Type.Pick(departamentoModel, ["id_departamento"]),
        response: {
          204: Type.Null(),
        },
        security: [{ bearerAuth: [] }],
      },
      //   onRequest: [fastify.isAdmin],
    },
    async (req, rep) => {
      await fastify.DepartamentosDB.update(
        req.params.id_departamento,
        req.body
      );
      rep.code(204).send();
    }
  );

  //   fastify.delete(
  //     "",
  //     {
  //       schema: {
  //         summary: "Eliminar departamento",
  //         tags: ["Departamentos"],
  //         description:
  //           "Ruta para eliminar un departamento. Se requiere ser un administrador",
  //         params: Type.Pick(departamentoModel, ["id_departamento"]),
  //         response: {
  //           204: Type.Null(),
  //         },
  //         security: [{ bearerAuth: [] }],
  //       },
  //       //   onRequest: [fastify.isAdmin],
  //     },
  //     async (req, rep) => {
  //       await fastify.DepartamentosDB.delete(req.params.id_articulo);
  //       rep.code(204).send();
  //     }
  //   );
};

export default departamentosRoutes;
