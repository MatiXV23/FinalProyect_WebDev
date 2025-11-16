export type Chat = {
    id_chat: number,
    id_comprador: number,
    id_vendedor: number,
}

export type ChatNombres = {
    id_chat: number,
    id_comprador: number,
    id_vendedor: number,
    id_otro: number,
    nombre_otro: string,
    apellido_otro: string,
    foto_url: string,
}

export type Mensaje = {
    id_chat: number,
    id_enviador: number,
    fecha_mensaje: string,
    contenido: string,
}