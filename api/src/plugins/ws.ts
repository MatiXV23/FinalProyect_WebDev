import fp from "fastify-plugin";
import { PC_NotFound } from "../errors/errors.ts";
import type { FastifyPluginAsync } from "fastify";
import websocket from '@fastify/websocket'


const jwtPlugin: FastifyPluginAsync = fp(async (fastify) => {
  await fastify.register(websocket);
});

export default jwtPlugin;

export const clientConnections = new Map()