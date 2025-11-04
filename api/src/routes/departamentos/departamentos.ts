import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { departamentoModel } from "../../models/market/departamentoModel.ts";

const departamentosRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener departamentos",
        tags: ["Departamentos"],
        description:
          "Ruta para obtener departamentos. No hay requerimientos de uso",
        response: {
          200: Type.Array(departamentoModel),
        },
      },
    },
    async (req, rep) => {
      return await fastify.DepartamentosDB.getAll();
    }
  );

  fastify.post(
    "",
    {
      schema: {
        summary: "Crear departamento",
        tags: ["Departamentos"],
        description:
          "Ruta para crear un departamento. Se requiere ser un administrador",
        body: Type.Omit(departamentoModel, ["id_departamento"]),
        response: {
          201: departamentoModel,
        },
        security: [{ bearerAuth: [] }],
      },
      onRequest: [fastify.authenticate],
    },
    async (req, res) => {
      await fastify.DepartamentosDB.create(req.body);
      res.code(201).send();
    }
  );
};
export default departamentosRoutes;
