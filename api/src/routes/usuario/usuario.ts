import {type FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox"
import { usuarioModel } from "../../models/usuarioModel.ts"
import { Type } from "@fastify/type-provider-typebox"
import { PC_NotImplemented } from "../../errors/errors.ts"



const usersRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
    fastify.get("/",{
        schema: {
            summary: "Obtener los usuarios",
            tags:['Usuario'],
            description: "Ruta para obtener todos los usuarios",
            response: {
                200: Type.Array(usuarioModel)
            }
        }
    }, async (req, rep)=>{
        return new PC_NotImplemented()
    });

    fastify.post("/", {
        schema: {
            summary: "Crear usuario",
            tags: ["Usuario"],
            description: "Ruta para crear usuarios",
            body: Type.Omit(usuarioModel,["id_usuario"]),
            response: {
                201: usuarioModel,
            }
        }
    },async (req, rep)=>{
        return new PC_NotImplemented()
    })
}

export default usersRoutes