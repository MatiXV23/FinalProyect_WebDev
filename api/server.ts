import Fastify from 'fastify'
import rootRoute from './src/routes/root.ts'
import swagger from './src/plugins/swagger.ts'

const fastify = Fastify({
  logger: true
})

const PORT = Number(process.env.PORT) || 3000

await fastify.register(swagger)
await fastify.register(rootRoute)


  try {
    await fastify.listen({ port: PORT })
    console.log(`Swagger UI disponible en http://localhost:${PORT}/docs`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }

export default fastify