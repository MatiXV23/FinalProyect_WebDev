import {type FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox"
import {articuloModel} from "../../../models/articuloModel.ts"
import { PC_NotImplemented } from "../../../errors/errors.ts"


//necesito autorizacion, solo el admin puede moficar el artículo
const articuloByIdRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
    fastify.put("/", {
        schema:{
            summary:"Modificar articulo",
            tags: ["Articulo"],
            description: "Ruta para modificar articulo",
            body: articuloModel,
            params: Type.Pick(articuloModel,["id_articulo"]),
            response: {
                204: Type.Null()
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
                204: Type.Null()
            }
        }
    }, async (req, rep)=>{
        return new PC_NotImplemented()
    })
}

export default articuloByIdRoutes