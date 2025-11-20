import { BasePgRepository } from "../../models/common/baseRepository.ts";
import {
  PC_InternalServerError,
  PC_NotFound,
  PC_NotImplemented,
} from "../../errors/errors.ts";
import type { Pool } from "pg";
import type { Departamento } from "../../models/market/departamentoModel.ts";

// TODO: REALIZAR ESTO ! ! !
export class DepartamentosDB extends BasePgRepository<Departamento> {
  constructor(pool: Pool) {
    super(pool);
  }

  #baseQuery = /*sql*/ `
                SELECT 
                    u.*
                FROM departamentos u
                `;

  async getAll(): Promise<Departamento[]> {
    const depa = await this.pool.query<Departamento>(this.#baseQuery);
    return depa.rows;
  }

  async getById(id: number): Promise<Departamento> {
    const whereQuery = `${this.#baseQuery} WHERE u.id_departamento = $1`;
    const vars = [id];
    const res = await this.pool.query<Departamento>(whereQuery, vars);

    if (res.rowCount === 0)
      throw new PC_NotFound(`Departamento con id (${id}) no encontrado`);
    return res.rows[0];
  }

  async create(data: Partial<Departamento>): Promise<Departamento> {
    const { nombre } = data;
    let query = `
    WITH nuevo_departamento AS (
        insert into departamentos (nombre)
        VALUES ($1)
        RETURNING *
        )
    SELECT * from nuevo_departamento`;
    try {
      const res = await this.pool.query(query, [nombre]);
      return res.rows[0];
    } catch (err: any) {
      throw new PC_InternalServerError(
        "Error en la creación de un departamento. \n" + err
      );
    }
  }

  async update(id: number, data: Partial<Departamento>): Promise<Departamento> {
    const { nombre } = data;
    let query = `UPDATE departamentos
                SET
                    nombre = COALESCE ($2, nombre)
                WHERE id_departamento = $1
                RETURNING *;
                    `;

    try {
      const res = await this.pool.query(query, [id, nombre]);
      if (res.rowCount === 0) {
        throw new PC_NotFound(`Departamento con id (${id}) no encontrado`);
      }
      return res.rows[0];
    } catch (err: any) {
      if (err instanceof PC_NotFound) throw err;
      throw new PC_InternalServerError(
        "Error al modificar un departamento \n" + err
      );
    }
  }

  async delete(id: number): Promise<void> {
    const query = `DELETE FROM departamentos
                        WHERE id_departamento = $1;`;
    const res = await this.pool.query<Departamento>(query, [id]);

    if (res.rowCount === 0) {
      throw new PC_NotFound(`Departamento con id (${id}) no encontrado`);
    }
  }
}
