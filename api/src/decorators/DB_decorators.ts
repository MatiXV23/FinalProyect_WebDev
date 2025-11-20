import fastifyPlugin from "fastify-plugin";
import { UsuariosDB } from "../services/data/usuariosDB.js";
import { CategoriasDB } from "../services/data/categoriesDB.js";
import { ArticulosDB } from "../services/data/artiticulosDB.js";
import { myPool } from "../services/db_service.js";
import { ChatsDB } from "../services/data/chatsDB.js";
import { DepartamentosDB } from "../services/data/departamentosDB.js";
import { ComprasDB } from "../services/data/comprasDB.js";
import { ReseniaDB } from "../services/data/reseniasDB.js";

export default fastifyPlugin(async function (fastify) {
  fastify.decorate("UsuariosDB", new UsuariosDB(myPool));
  fastify.decorate("ArticulosDB", new ArticulosDB(myPool));
  fastify.decorate("CategoriasDB", new CategoriasDB(myPool));
  fastify.decorate("ComprasDB", new ComprasDB(myPool));
  fastify.decorate("ReseniaDB", new ReseniaDB(myPool));
  fastify.decorate("ChatsDB", new ChatsDB(myPool));
  fastify.decorate("DepartamentosDB", new DepartamentosDB(myPool));
});

declare module "fastify" {
  interface FastifyInstance {
    UsuariosDB: UsuariosDB;
    ArticulosDB: ArticulosDB;
    ReseniaDB: ReseniaDB;
    CategoriasDB: CategoriasDB;
    DepartamentosDB: DepartamentosDB;
    ComprasDB: ComprasDB;
    ChatsDB: ChatsDB;
  }
}
