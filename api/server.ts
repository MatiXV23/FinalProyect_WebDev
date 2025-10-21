import Fastify from "fastify";
import autoLoad from "@fastify/autoload";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(dirname(__filename), "src");

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

const PORT = Number(process.env.PORT) || 3000;

await fastify.register(autoLoad, {
  dir: join(__dirname, "plugins"),
});
await fastify.register(autoLoad, {
  dir: join(__dirname, "decorators"),
});

fastify.register(autoLoad, {
  dir: join(__dirname, "routes"),
  routeParams: true,
});

try {
  await fastify.listen({ port: PORT });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

export default fastify;
