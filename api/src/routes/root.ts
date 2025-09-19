import { FastifyPluginAsync } from 'fastify';

const root: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async (request, reply) => {
    return { message: 'Esta es la ruta root' };
  });
};

export default root;