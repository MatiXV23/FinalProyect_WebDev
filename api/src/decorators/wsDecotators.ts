import fastifyPlugin from "fastify-plugin";
import { clientesMap } from "../plugins/ws.ts";

export default fastifyPlugin(async function (fastify) {
  fastify.decorate(
    "notifyClient",
    async function (id_usuario: any, mensaje: any) {
      const socketUser = clientesMap.get(id_usuario);
      if (!socketUser) return;
      socketUser.send(JSON.stringify({ mensaje }));
    }
  );
});

declare module "fastify" {
  interface FastifyInstance {
    notifyClient(id_usuario: any, mensaje: any): void;
  }
}
