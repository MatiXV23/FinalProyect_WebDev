import fastifyPlugin from "fastify-plugin";
import { UsuariosDB } from "../services/data/usuariosDB.ts";
import { CategoriasDB } from "../services/data/categoriesDB.ts";
import { ArticulosDB } from "../services/data/artiticulosDB.ts";
import { myPool } from "../services/db_service.ts";
import { ChatsDB } from "../services/data/chatsDB.ts";
import { DepartamentosDB } from "../services/data/departamentosDB.ts";
import { ComprasDB } from "../services/data/comprasDB.ts";

export default fastifyPlugin(async function (fastify) {
  fastify.decorate("UsuariosDB", new UsuariosDB(myPool));
  fastify.decorate("ArticulosDB", new ArticulosDB(myPool));
  fastify.decorate("CategoriasDB", new CategoriasDB(myPool));
  fastify.decorate("ComprasDB", new ComprasDB(myPool));
  fastify.decorate("ChatsDB", new ChatsDB(myPool));
  fastify.decorate("DepartamentosDB", new DepartamentosDB(myPool));
});

declare module "fastify" {
  interface FastifyInstance {
    UsuariosDB: UsuariosDB;
    ArticulosDB: ArticulosDB;
    CategoriasDB: CategoriasDB;
    DepartamentosDB: DepartamentosDB;
    ComprasDB: ComprasDB;
    ChatsDB: ChatsDB;
  }
}
