import { BasePgRepository } from "../../models/common/baseRepository.ts";
import {
  PC_NotFound,
  PC_BadRequest,
  PC_InternalServerError,
  PC_NotImplemented,
} from "../../errors/errors.ts";
import type { Pool } from "pg";
import type { Categoria } from "../../models/market/categoriaModel.ts";
import { myPool } from "./db_service.ts";

// TODO: REALIZAR ESTO ! ! !
export class CategoriasDB extends BasePgRepository<Categoria> {
  static rows:
    | { id_categoria: number; nombre: string }[]
    | PromiseLike<{ id_categoria: number; nombre: string }[]>;
  constructor(pool: Pool) {
    super(pool);
  }

  #baseQuery = /*sql*/ `
                SELECT 
                    u.*
                FROM categorias u
                `;

  async getAll(): Promise<Categoria[]> {
    const resultado = await this.pool.query<Categoria>(this.#baseQuery);
    return resultado.rows;
  }

  async getById(id: number): Promise<Categoria> {
    throw new PC_NotImplemented();
  }

  async create(data: Partial<Categoria>): Promise<Categoria> {
    throw new PC_NotImplemented();
  }

  async update(id: number, data: Partial<Categoria>): Promise<Categoria> {
    throw new PC_NotImplemented();
  }

  async delete(id: number): Promise<void> {
    throw new PC_NotImplemented();
  }
}
