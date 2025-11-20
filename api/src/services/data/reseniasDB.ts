import { BasePgRepository } from "../../models/common/baseRepository.js";
import {
  PC_InternalServerError,
  PC_NotImplemented,
} from "../../errors/errors.js";
import type { Pool } from "pg";
import { type Resenia } from "../../models/market/reseniaModel.js";
import { type ReseniaPost } from "../../models/market/reseniaModel.js";

// TODO: REALIZAR ESTO ! ! !
export class ReseniaDB extends BasePgRepository<Resenia> {
  constructor(pool: Pool) {
    super(pool);
  }

  private getQuery(whereCondition: string | null = null) {
    return /*sql*/ `
            SELECT
                r.*
            FROM resenias r
            ${whereCondition ?? ""}
            ;
        `;
  }

  async getAll(): Promise<Resenia[]> {
    try {
      const reseniasTotales = await this.pool.query<Resenia>(this.getQuery());

      return reseniasTotales.rows;
    } catch (e) {
      console.log(e);
      throw new PC_InternalServerError();
    }
  }

  async getById(id: number): Promise<Resenia> {
    throw new PC_NotImplemented();
  }

  async create(data: Partial<ReseniaPost>): Promise<Resenia> {
    const { id_vendedor, comentario, reputacion, id_articulo } = data;
    let query = `
        WITH nueva_resenia AS (
            insert into resenias ( id_vendedor, comentario, reputacion, id_articulo)
                VALUES ($1, $2, $3, $4)
                RETURNING *
            )
        SELECT * from nueva_resenia;
    `;
    try {
      const res = await this.pool.query<Resenia>(query, [
        id_vendedor,
        comentario,
        reputacion,
        id_articulo,
      ]);
      return res.rows[0]!;
    } catch (e: any) {
      throw new PC_InternalServerError(
        "Error en la creacion de una reseña: " + e
      );
    }
  }

  async update(id: number, data: Partial<Resenia>): Promise<Resenia> {
    throw new PC_NotImplemented();
  }

  async delete(id: number): Promise<void> {
    throw new PC_NotImplemented();
  }

  async getAllUserRes(id_usuario: number): Promise<Resenia[]> {
    try {
      const reseniasTotales = await this.pool.query<Resenia>(
        this.getQuery(`WHERE r.id_vendedor = $1`),
        [id_usuario]
      );

      return reseniasTotales.rows;
    } catch (e) {
      throw new PC_InternalServerError();
    }
  }
}
