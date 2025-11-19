import fastifyPlugin from "fastify-plugin";
import { clientConnections } from "../plugins/ws.js";

export default fastifyPlugin(async function (fastify) {
  fastify.decorate(
    "notifyClient",
    async function (id_usuario: number, data: any) {
      const socket = clientConnections.get(id_usuario);
      if (!socket) return;

      const message = JSON.stringify({ data });

      socket.send(message);
    }
  );
});

declare module "fastify" {
  interface FastifyInstance {
    notifyClient(id_usuario: number, messageData: any): void;
  }
}
