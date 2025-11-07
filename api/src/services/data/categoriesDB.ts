import { BasePgRepository } from "../../models/common/baseRepository.ts";
import {
  PC_NotFound,
  PC_BadRequest,
  PC_InternalServerError,
  PC_NotImplemented,
} from "../../errors/errors.ts";
import type { Pool } from "pg";
import type { Categoria } from "../../models/market/categoriaModel.ts";

// TODO: REALIZAR ESTO ! ! !
export class CategoriasDB extends BasePgRepository<Categoria> {
  constructor(pool: Pool) {
    super(pool);
  }

  private getQuery(whereCondition: string | null = null) {
    const query = /*sql*/ `
            SELECT * from categorias a
            ${whereCondition ?? ""}
        `;

    return query;
  }

  async getAll(): Promise<Categoria[]> {
    const resultado = await this.pool.query<Categoria>(this.getQuery());
    return resultado.rows;
  }

  async getById(id: number): Promise<Categoria> {
    const query = this.getQuery(`WHERE a.id_categoria = $1`);
    const vars = [id];
    console.info(query, "id:", id);
    const resultado = await this.pool.query<Categoria>(query, vars);

    if (resultado.rowCount === 0)
      throw new PC_NotFound(`Categoria con id (${id}) no encontrado`);
    return resultado.rows[0];
  }

  async create(data: Partial<Categoria>): Promise<Categoria> {
    const { nombre } = data;

    let query = ` WITH nuevo_categoria AS (insert into categorias (nombre) 
        VALUES ($1)
        RETURNING*)
        SELECT * from nuevo_categoria;`;

    try {
      const resultado = await this.pool.query(query, [nombre]);
      return resultado.rows[0];
    } catch (err: any) {
      throw new PC_InternalServerError("Error en la creacion de una categoria");
    }
  }

  async update(id: number, data: Partial<Categoria>): Promise<Categoria> {
    const { nombre } = data;

    let query = `UPDATE categorias
                SET 
                nombre = COALESCE($2, nombre)
                WHERE id_categoria = $1
                RETURNING *;         
                `;

    try {
      const resultado = await this.pool.query(query, [id, nombre]);

      if (resultado.rowCount === 0) {
        throw new PC_NotFound(`Categoria con id (${id}) no encontrado`);
      }

      return resultado.rows[0];
    } catch (err: any) {
      throw new PC_InternalServerError("Error al modificar articulo");
    }
  }

  async delete(id: number): Promise<void> {
    const query = `DELETE FROM categorias
                        WHERE id_categoria = $1;`;
    const resultado = await this.pool.query<Categoria>(query, [id]);

    if (resultado.rowCount === 0)
      throw new PC_NotFound(`Categoria de id ${id}, no existe. Ignorado`);
    console.log(resultado);
  }
}
