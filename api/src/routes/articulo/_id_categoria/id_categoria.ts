import { FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox";
import { articuloModel } from "../../../models/articuloModel";
import { PC_NotImplemented } from "../../../errors/errors";


const articuloByCategoriaRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
        fastify.get("/",{
        schema:{
            summary:"Obtener articulo",
            tags: ["Articulo"],
            description:"Ruta para obtener articulos por categoria",
            params: Type.Pick(articuloModel,["categoria"]),
            response: {
                200: Type.Array(articuloModel)
            }
        }
    },async (req, rep)=>{
        return new PC_NotImplemented()
    });
}