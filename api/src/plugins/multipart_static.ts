import fp from "fastify-plugin";
import type { FastifyPluginAsync } from "fastify";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import path from "path";

const multipartPlugin: FastifyPluginAsync = fp(async (fastify) => {
  await fastify.register(fastifyMultipart);

  fastify.register(fastifyStatic, {
    root: path.join(process.cwd(), 'fotos'),
    prefix: '/fotos/'
  })
});

export default multipartPlugin;


