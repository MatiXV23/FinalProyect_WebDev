import fastifyPlugin from "fastify-plugin";
import fastifyCors from "@fastify/cors";

export default fastifyPlugin(async function (fastify) {
    const FRONT_PORT = Number(process.env.FRONT_PORT) || 4200;

    fastify.register(fastifyCors, {
        origin: ["http://localhost:4200", `http://localhost:${FRONT_PORT}`, "http://192.168.1.38:4200" ],
        methods: ['GET', 'PUT', 'DELETE', 'POST', 'PATCH']
    });
});