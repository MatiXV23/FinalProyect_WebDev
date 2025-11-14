import { type FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import { usuarioModel } from "../../models/market/usuarioModel.ts";
import { Type } from "@fastify/type-provider-typebox";
import { clientesMap } from "../../plugins/ws.ts";

const wsRoutes: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.get(
    "",
    {
      websocket: true,
      schema: {
        summary: "Ruta del web socket",
        tags: ["Usuario"],
        querystring: Type.Pick(usuarioModel, ["id_usuario"]),
        description:
          "Ruta para obtener el socket. No hay requerimientos de uso",
      },
    },
    (socket, req) => {
      const { id_usuario } = req.query;
      clientesMap.set(id_usuario, socket);
      socket.send(JSON.stringify({ mensaje: "Check socket" }));
    }
  );
};
export default wsRoutes;
