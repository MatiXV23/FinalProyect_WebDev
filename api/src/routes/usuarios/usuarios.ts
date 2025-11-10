import { type FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { usuarioModel, usuarioPostModel, UsuarioQueryModel } from "../../models/market/usuarioModel.ts";
import { Type } from "@fastify/type-provider-typebox";
import { PC_NotImplemented } from "../../errors/errors.ts";

const usersRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener los usuarios",
        tags: ["Usuario"],
        querystring: UsuarioQueryModel,
        description:
          "Ruta para obtener todos los usuarios. No hay requerimientos de uso",
        response: {
          200: Type.Array(usuarioModel),
        },
      },
    },
    async (req, rep) => {
      if (req.query)  return await fastify.UsuariosDB.findAll(req.query);
      return await fastify.UsuariosDB.getAll();
    }
  );

  fastify.post(
    "",
    {
      schema: {
        summary: "Crear usuario",
        tags: ["Usuario"],
        description: "Ruta para crear usuarios. No hay requerimientos de uso",
        body: usuarioPostModel,
        response: {
          201: usuarioModel,
        },
      },
    },
    async (req, rep) => {
      rep.code(201).send(await fastify.UsuariosDB.create(req.body))
    }
  );
};

export default usersRoutes;
