import { FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox"
import {articuloModel} from "../../../models/articuloModel"
import { PC_NotImplemented } from "../../../errors/errors"


//necesito autorizacion, solo el admin puede moficar el artículo
const articuloByIdRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
    fastify.put("/", {
        schema:{
            summary:"Modificar articulo",
            tags: ["Articulo"],
            description: "Ruta para modificar articulo",
            body: Type.Partial(articuloModel),
            params: Type.Pick(articuloModel,["id_articulo"]),
            response: {
                201: articuloModel,
            }
        }
    }, async (req, rep)=>{
        return new PC_NotImplemented()
    });

    fastify.delete("/", {
        schema:{
            summary: "Eliminar articulo",
            tags: ["Articulo"],
            description:"Ruta para eliminar articulo",
            params: Type.Pick(articuloModel, ["id_articulo"]),
            response: {
                201: Type.Null()
            }
        }
    }, async (req, rep)=>{
        return new PC_NotImplemented()
    })
}