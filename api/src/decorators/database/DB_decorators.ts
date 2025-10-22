import fastifyPlugin from "fastify-plugin";
import { UsuariosDB } from "../../services/data/usuariosDB.ts";
import { CategoriasDB } from "../../services/data/categoriesDB.ts";
import { ArticulosDB } from "../../services/data/artiticulosDB.ts";
import { myPool } from "../../services/data/db_service.ts"; 

export default fastifyPlugin(async function(fastify){
    fastify.decorate("UsuariosDB", new UsuariosDB(myPool))
    fastify.decorate("ArticulosDB", new ArticulosDB(myPool))
    fastify.decorate("CategoriasDB", new CategoriasDB(myPool))
})

declare module 'fastify'{
    interface FastifyInstance {
        UsuariosDB: UsuariosDB,
        ArticulosDB: ArticulosDB,
        CategoriasDB: CategoriasDB
    }
}