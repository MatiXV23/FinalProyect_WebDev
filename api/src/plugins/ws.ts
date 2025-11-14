import fp from "fastify-plugin";
import type { FastifyPluginAsync } from "fastify";
import websocket from "@fastify/websocket";

const wsPlugin: FastifyPluginAsync = fp(async (fastify) => {
  await fastify.register(websocket);
});

export default wsPlugin;

// Diccionario que guarda id_usuario y un socket.
export const clientesMap = new Map();
