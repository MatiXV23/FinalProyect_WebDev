import fastifyPlugin from "fastify-plugin";
import { PC_NoAuthorized } from "../../errors/errors.ts";
import type { FastifyReply, FastifyRequest } from "fastify";

export default fastifyPlugin(async function (fastify) {
  fastify.decorate("isAdmin", async (req:any, rep:any) => {
    const usuario = req.user;
    if (usuario.administrador === false) throw new PC_NoAuthorized();
  });
});

declare module "fastify" {
  interface FastifyInstance {
    isAdmin(req:any, rep:any): void;
  }
}
