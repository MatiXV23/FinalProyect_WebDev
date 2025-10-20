import { FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox"
import {articuloModel} from "../../models/articuloModel.ts"
import { PC_NotImplemented } from "../../errors/errors"


const articuloRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
    fastify.get("/",{
        schema:{
            summary:"Obtener articulo",
            tags: ["Articulo"],
            description:"Ruta para obtener articulo",
            response: {
                200: Type.Array(articuloModel)
            }
        }
    },async (req, rep)=>{
        return new PC_NotImplemented()
    });

    fastify.post("/", {
        schema:{
            summary:"",
            tags: [""],
            description: "",
            body: Type.Omit(articuloModel, ["id_articulo"]),
        }
    }, async (req, rep)=>{
        return new PC_NotImplemented()
    })
}