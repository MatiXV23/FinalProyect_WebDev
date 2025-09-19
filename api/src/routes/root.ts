import type { FastifyPluginAsync } from 'fastify';

const root: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', {
    schema: {
      description: 'point roots',
      tags: ['roots'],
      response: {
        200: {
          type: 'object',
          properties: {
            root: { type: 'boolean' } 
          }
        }
      }
    }
  }, async (request, reply) => {
    reply.code(200).send({ root: true }); 
  });
};

export default root;