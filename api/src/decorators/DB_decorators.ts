import fastifyPlugin from "fastify-plugin";
import { UsuariosDB } from "../services/data/usuariosDB.ts";
import { CategoriasDB } from "../services/data/categoriesDB.ts";
import { ArticulosDB } from "../services/data/artiticulosDB.ts";
import { myPool } from "../services/db_service.ts"; 
import { ChatsDB } from "../services/data/chatsDB.ts";

export default fastifyPlugin(async function(fastify){
    fastify.decorate("UsuariosDB", new UsuariosDB(myPool))
    fastify.decorate("ArticulosDB", new ArticulosDB(myPool))
    fastify.decorate("CategoriasDB", new CategoriasDB(myPool))
    fastify.decorate("ChatsDB", new ChatsDB(myPool))
})

declare module 'fastify'{
    interface FastifyInstance {
        UsuariosDB: UsuariosDB,
        ArticulosDB: ArticulosDB,
        CategoriasDB: CategoriasDB,
        ChatsDB: ChatsDB
    }
}