export type Chat = {
    id_chat: number,
    id_comprador: number,
    id_vendedor: number,
}

export type ChatNombres = {
    id_chat: number,
    id_comprador: number,
    id_vendedor: number,
    nombre_persona: string,
    apellido_persona: string,
    foto_url: string,
}

export type Mensaje = {
    id_chat: number,
    id_enviador: number,
    fecha_mensaje: string,
    contenido: string,
}