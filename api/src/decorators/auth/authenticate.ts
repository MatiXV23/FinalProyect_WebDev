import fastifyPlugin from "fastify-plugin";
import { PC_NoAuthorized } from "../../errors/errors.ts";
import type { FastifyReply, FastifyRequest } from "fastify";

export default fastifyPlugin(async function (fastify) {
   fastify.decorate('authenticate', async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch {
        throw new PC_NoAuthorized();
      }
    });
});

declare module "fastify" {
  interface FastifyInstance {
    authenticate(request: FastifyRequest, reply: FastifyReply): void;
  }
}

    
    
   