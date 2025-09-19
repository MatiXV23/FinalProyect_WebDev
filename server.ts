import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})

const PORT = Number(process.env.PORT) || 3000

await fastify.register(import('@fastify/swagger'), {
  swagger: {
    info: {
      title: 'API Server',
      description: 'Servidor básico con Fastify y Swagger',
      version: '1.0.0'
    },
    host: `localhost:${PORT}`,
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
})

await fastify.register(import('@fastify/swagger-ui'), {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  }
})

fastify.get('/', {
  schema: {
    description: 'Endpoint raíz de la API',
    tags: ['root'],
    response: {
      200: {
        type: 'object',
        properties: {
          root: { type: 'boolean' }
        }
      }
    }
  }
}, async () => {
  return { root: true }
})

const start = async () => {
  try {
    await fastify.listen({ port: PORT })
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
    console.log(`Swagger UI disponible en http://localhost:${PORT}/docs`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()

export default fastify