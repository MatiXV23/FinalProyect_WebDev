import {
  type FastifyPluginAsyncTypebox,
  Type,
} from "@fastify/type-provider-typebox";
import { articuloModel } from "../../../../models/market/articuloModel.ts";
import { PC_NotImplemented } from "../../../../errors/errors.ts";

//necesito autorizacion, cualquiera menos el owner
const articuloByIdRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  
};

export default articuloByIdRoutes;
