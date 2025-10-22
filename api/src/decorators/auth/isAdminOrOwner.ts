import fastifyPlugin from "fastify-plugin";
import { PC_NoAuthorized } from "../../errors/errors.ts";

export default fastifyPlugin(async function (fastify) {
  fastify.decorate("isAdminOrOwner", async (req:any, rep:any) => {
    const usuario = req.user;
    if (
      usuario.administrador === false &&
      !(req.params.id_usuario === usuario.id_usuario)
    )
      throw new PC_NoAuthorized();
  });
});

declare module "fastify" {
  interface FastifyInstance {
    isAdminOrOwner(req:any, rep:any): void;
  }
}
