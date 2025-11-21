import fp from "fastify-plugin";
import type { FastifyPluginAsync } from "fastify";
import websocket from "@fastify/websocket";

const websocketPlugin: FastifyPluginAsync = fp(async (fastify) => {
  await fastify.register(websocket);
});

export default websocketPlugin;

export const clientConnections = new Map();
