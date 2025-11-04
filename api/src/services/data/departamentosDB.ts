import { BasePgRepository } from "../../models/common/baseRepository.ts";
import {
  PC_InternalServerError,
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
    throw new PC_NotImplemented();
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

  async delete(id: number): Promise<void> {
    throw new PC_NotImplemented();
  }
}
