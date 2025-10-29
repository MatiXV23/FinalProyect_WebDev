import { type FastifyPluginAsync } from "fastify";
import { Type } from "@fastify/type-provider-typebox";
import { PC_NotImplemented } from "../../../errors/errors.ts";
import { usuarioModel } from "../../../models/market/usuarioModel.ts";

//necesito autorizacion, solo el admin y el usuario puede moficarse a si mismo
const usersByIdRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener usuario",
        tags: ["Usuario"],
        description:
          "Ruta para obtener un usuario.",
        params: Type.Pick(usuarioModel, ["id_usuario"]),
        response: {
          200: usuarioModel,
        },
      },
    },
    async (req, rep) => {
      return new PC_NotImplemented();
    }
  );

  fastify.put(
    "",
    {
      schema: {
        summary: "Modificar usuario",
        tags: ["Usuario"],
        description:
          "Ruta para modificar un usuario. Se requiere ser el usuario dueño o ser un administrador",
        body: usuarioModel,
        params: Type.Pick(usuarioModel, ["id_usuario"]),
        response: {
          204: Type.Null(),
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: [fastify.isAdminOrOwner],
      onRequest: [fastify.authenticate],
    },
    async (req, rep) => {
      return new PC_NotImplemented();
    }
  );

  fastify.delete(
    "",
    {
      schema: {
        summary: "Eliminar usuario",
        tags: ["Usuario"],
        description:
          "Ruta para eliminar un usuario. Se requiere ser el usuario dueño o ser un administrador",
        params: Type.Pick(usuarioModel, ["id_usuario"]),
        response: {
          204: Type.Null(),
        },
        security: [{ bearerAuth: [] }],
      },
      preHandler: [fastify.isAdminOrOwner],
      onRequest: [fastify.authenticate],
    },
    async (req, rep) => {
      return new PC_NotImplemented();
    }
  );
};

export default usersByIdRoutes;
