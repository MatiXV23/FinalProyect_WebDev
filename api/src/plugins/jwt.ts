import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import { PC_NotFound } from "../errors/errors.js";
import type { FastifyPluginAsync } from "fastify";
import type { JWTUsuario } from "../models/market/usuarioModel.js";

const jwtPlugin: FastifyPluginAsync = fp(async (fastify) => {
  const secret = process.env.FASTIFY_SECRET || "";
  if (!secret) throw new PC_NotFound("Falta setear el secret.");

  await fastify.register(jwt, { secret });
});

export default jwtPlugin;

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: JWTUsuario;
    user: JWTUsuario;
  }
}
