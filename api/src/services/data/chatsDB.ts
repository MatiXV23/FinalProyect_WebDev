import { BasePgRepository } from "../../models/common/baseRepository.js";
import {
  PC_NotFound,
  PC_BadRequest,
  PC_InternalServerError,
  PC_NotImplemented,
} from "../../errors/errors.js";
import type { Pool } from "pg";
import type { Chat } from "../../models/market/chatModel.js";
import type { Mensaje } from "../../models/market/mensajeModel.js";

export class ChatsDB {
  protected pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }

  private getQuery(whereCondition: string | null = null) {
    return /*sql*/ `
            SELECT
                c.*
            FROM chats c
            ${whereCondition ?? ""}
            ;
        `;
  }

  async getAll(id_usuario: number): Promise<Chat[]> {
    try {
      const chats = await this.pool.query<Chat>(
        this.getQuery("WHERE c.id_vendedor = $1 OR c.id_comprador = $1"),
        [id_usuario]
      );
      return chats.rows;
    } catch (e) {
      throw new PC_InternalServerError();
    }
  }

  async getById(id_chat: number): Promise<Chat> {
    try {
      const chats = await this.pool.query<Chat>(
        this.getQuery("WHERE c.id_chat = $1"),
        [id_chat]
      );

      if (chats.rowCount === 0)
        throw new PC_NotFound(`Chat con id (${id_chat}) no encontrado`);
      return chats.rows[0]!;
    } catch (e) {
      throw new PC_InternalServerError();
    }
  }

  async create(data: Partial<Chat>): Promise<Chat> {
    const { id_comprador, id_vendedor } = data;

    let query = /*sql*/ ` 
                    WITH nuevo_chat AS (
                        insert into chats (id_comprador, id_vendedor) 
                            VALUES ($1, $2)
                            RETURNING *
                        ) 
                    SELECT * from nuevo_chat;`;
    try {
      const res = await this.pool.query<Chat>(query, [
        id_comprador,
        id_vendedor,
      ]);
      return res.rows[0]!;
    } catch (err: any) {
      throw new PC_InternalServerError();
    }
  }

  async update(id: number, data: Partial<Chat>): Promise<Chat> {
    throw new PC_NotImplemented();
  }

  async delete(id_chat: number): Promise<void> {
    try {
      const query = `DELETE FROM usuarios
                            WHERE id_usuario = $1;`;
      const res = await this.pool.query<Chat>(query, [id_chat]);

      if (res.rowCount === 0)
        throw new PC_NotFound(`Usuario de id ${id_chat}, no existe. Ignorando`);
      console.log(res);
    } catch (e) {
      throw new PC_InternalServerError();
    }
  }

  private getMsgQuery(whereCondition: string | null = null) {
    return /*sql*/ `
            SELECT
                m.*
            FROM mensajes m
            ${whereCondition ?? ""}
            ;
        `;
  }

  async getMensajesFromChat(id_chat: number): Promise<Mensaje[]> {
    try {
      const chats = await this.pool.query<Mensaje>(
        this.getMsgQuery("WHERE m.id_chat = $1"),
        [id_chat]
      );
      return chats.rows;
    } catch (e) {
      throw new PC_InternalServerError();
    }
  }

  async createMensajeForChat(data: Partial<Mensaje>): Promise<Mensaje> {
    const { id_enviador, contenido, id_chat } = data;

    let query = /*sql*/ ` 
                    WITH nuevo_chat AS (
                        insert into mensajes (id_chat, id_enviador, contenido) 
                            VALUES ($1, $2, $3)
                            RETURNING *
                        ) 
                    SELECT * from nuevo_chat;`;
    try {
      const res = await this.pool.query<Mensaje>(query, [
        id_chat,
        id_enviador,
        contenido,
      ]);
      return res.rows[0]!;
    } catch (err: any) {
      throw new PC_InternalServerError();
    }
  }
}
