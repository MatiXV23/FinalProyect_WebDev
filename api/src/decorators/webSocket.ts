import fastifyPlugin from "fastify-plugin";
import { clientConnections } from "../plugins/ws.ts";

export default fastifyPlugin(async function (fastify) {
  fastify.decorate('notifyClient', async function (id_usuario: number, messageData: any) {
    const socket = clientConnections.get(id_usuario);
    if (!socket) return
    
    const message = JSON.stringify({ messageData });
    
    socket.send(message);
  }); 
});

declare module "fastify" {
  interface FastifyInstance {
    notifyClient(id_usuario: number, messageData: any): void;
  }
}
