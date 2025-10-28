import {Type} from "@fastify/type-provider-typebox";

export const ErrorSchema = Type.Object({
    statusCode: Type.Integer(),
    error: Type.String(),
    message: Type.String()
}, {
    title: "Esquema para errores"
})
