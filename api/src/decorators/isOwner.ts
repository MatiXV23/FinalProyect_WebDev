import fastifyPlugin from "fastify-plugin";
import { PC_NoAuthorized } from "../errors/errors.ts";

export default fastifyPlugin(async function (fastify) {
  fastify.decorate("isOwner", (req, rep) => {
    const usuario = (req as any).user;
    console.log(usuario);
    if (!(req.params.id_usuario === usuario.id_usuario))
      throw new PC_NoAuthorized();
    return;
  });
});

declare module "fastify" {
  interface FastifyInstance {
    isOwner(req, rep): void;
  }
}
