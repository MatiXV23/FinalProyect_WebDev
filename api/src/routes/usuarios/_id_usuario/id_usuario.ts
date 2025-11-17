import { type FastifyPluginAsync } from "fastify";
import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { PC_NotImplemented } from "../../../errors/errors.ts";
import { usuarioModel } from "../../../models/market/usuarioModel.ts";
import { credencialesModel } from "../../../models/market/credencialesModel.ts";

//necesito autorizacion, solo el admin y el usuario puede moficarse a si mismo
const usersByIdRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "",
    {
      schema: {
        summary: "Obtener usuario",
        tags: ["Usuario"],
        description: "Ruta para obtener un usuario.",
        params: Type.Pick(usuarioModel, ["id_usuario"]),
        response: {
          200: usuarioModel,
        },
      },
    },
    async (req, rep) => {
      return fastify.UsuariosDB.getById(req.params.id_usuario);
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
      onRequest: [fastify.authenticate],
      preHandler: [fastify.isAdminOrOwner],
    },
    async (req, rep) => {
      await fastify.UsuariosDB.update(req.params.id_usuario, req.body);
      fastify.notifyClient(req.params.id_usuario, { type: "Usuario_editado" });
      rep.code(204).send();
    }
  );

  fastify.patch(
    "",
    {
      schema: {
        summary: "Modificar usuario",
        tags: ["Usuario"],
        description:
          "Ruta para modificar un usuario. Se requiere ser el usuario dueño o ser un administrador",
        body: Type.Partial(usuarioModel),
        params: Type.Pick(usuarioModel, ["id_usuario"]),
        response: {
          204: Type.Null(),
        },
        security: [{ bearerAuth: [] }],
      },
      onRequest: [fastify.authenticate],
      preHandler: [fastify.isAdminOrOwner],
    },
    async (req, rep) => {
      await fastify.UsuariosDB.update(req.params.id_usuario, req.body);
      fastify.notifyClient(req.params.id_usuario, { type: "Usuario_editado" });
      rep.code(204).send();
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
      onRequest: [fastify.authenticate],
      preHandler: [fastify.isAdminOrOwner],
    },
    async (req, rep) => {
      fastify.UsuariosDB.delete(req.params.id_usuario);
    }
  );

  fastify.put(
    "/pwd",
    {
      schema: {
        summary: "Modificar password de usuario",
        tags: ["Usuario"],
        description:
          "Ruta para modificar la password un usuario. Se requiere ser el usuario dueño",
        body: Type.Object({ password: Type.String() }),
        params: Type.Pick(usuarioModel, ["id_usuario"]),
        response: {
          204: Type.Null(),
        },
        security: [{ bearerAuth: [] }],
      },
      onRequest: [fastify.authenticate],
      preHandler: [fastify.isOwner],
    },
    async (req, rep) => {
      await fastify.UsuariosDB.updatePass(
        req.params.id_usuario,
        req.body.password
      );
      fastify.notifyClient(req.params.id_usuario, { type: "Usuario_editado" });
      rep.code(204).send();
    }
  );
};

export default usersByIdRoutes;
