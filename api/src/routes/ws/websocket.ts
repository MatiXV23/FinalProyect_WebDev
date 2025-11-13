import { type FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { Type } from "@fastify/type-provider-typebox";
import { usuarioModel } from "../../models/market/usuarioModel.ts";
import { clientConnections } from "../../plugins/ws.ts";

const websocketRoute: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "",
    {
        websocket: true,
        schema: {
            tags: ['WebSocket'],
            summary: "Iniciar la conexion con WS",
            querystring: Type.Pick(usuarioModel, ["id_usuario"]),
            description:
            "Ruta para iniciar la conexion con WS. No hay requerimientos de uso",
        },
    },  (socket, req) => {

        const { id_usuario } = req.query

        clientConnections.set(id_usuario, socket)
        
        socket.send(JSON.stringify({
            mensaje: 'Conectado al servidor',
            id_usuario: id_usuario
        }))
    }
  );

 
};

export default websocketRoute;
