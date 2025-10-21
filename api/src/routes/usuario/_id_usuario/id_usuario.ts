import { FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox"
import { PC_NotImplemented } from "../../../errors/errors.ts"
import { usuarioModel } from "../../../models/usuarioModel.ts"

//necesito autorizacion, solo el admin y el usuario puede moficarse a si mismo
const usersByIdRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
    fastify.put("/",{
        schema:{
            summary: "Modificar usuario",
            tags:["Usuario"],
            description: "Ruta para modificar un usuario",
            body: usuarioModel,
            params: Type.Pick(usuarioModel, ["id_usuario"]),
            response: {
                204: Type.Null()
            }
        }
    },async (req,rep)=>{
        return new PC_NotImplemented()
    })

    fastify.delete("/", {
        schema:{
            summary: "Eliminar usuario",
            tags: ["Usuario"],
            description:"Ruta para eliminar un usuario",
            params: Type.Pick(usuarioModel, ["id_usuario"]),
            response: {
                204: Type.Null()
            }
        }
    }, async (req, rep)=>{
        return new PC_NotImplemented()
    })
}
