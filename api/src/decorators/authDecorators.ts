import fastifyPlugin from "fastify-plugin";
import { PC_NoAuthorized } from "../errors/errors.js";

export default fastifyPlugin(async function (fastify) {
  fastify.decorate("authenticate", async function (request: any, reply: any) {
    try {
      await request.jwtVerify();
    } catch {
      throw new PC_NoAuthorized();
    }
  });

  fastify.decorate("isOwner", async (req: any, rep: any) => {
    const usuario = req.user;

    if (req.params.id_usuario !== usuario.id_usuario)
      throw new PC_NoAuthorized();
  });

  fastify.decorate("isAdminOrOwner", async (req: any, rep: any) => {
    const usuario = req.user;
    if (
      usuario.administrador === false &&
      req.params.id_usuario !== usuario.id_usuario
    )
      throw new PC_NoAuthorized();
  });

  fastify.decorate("isAdmin", async (req: any, rep: any) => {
    const usuario = req.user;
    if (usuario.administrador === false) throw new PC_NoAuthorized();
  });

  fastify.decorate("isNotOwner", async (req: any, rep: any) => {
    const usuario = req.user;
    console.log({ usuario, id: req.params.id_usuario });
    if (req.params.id_usuario === usuario.id_usuario)
      throw new PC_NoAuthorized(
        "No puedes interactuar en esta ruta con ti mismo"
      );
  });
});

declare module "fastify" {
  interface FastifyInstance {
    authenticate(request: any, reply: any): void;
    isOwner(req: any, rep: any): void;
    isAdminOrOwner(req: any, rep: any): void;
    isAdmin(req: any, rep: any): void;
    isNotOwner(req: any, rep: any): void;
  }
}
