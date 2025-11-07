import { BasePgRepository } from "../../models/common/baseRepository.ts";
import {
  PC_InternalServerError,
  PC_NotFound,
  PC_NotImplemented,
} from "../../errors/errors.ts";
import type { Pool } from "pg";
import { type Compra } from "../../models/market/compraModel.ts";

// TODO: REALIZAR ESTO ! ! !
export class ComprasDB extends BasePgRepository<Compra> {
  constructor(pool: Pool) {
    super(pool);
  }

  private getQuery(whereCondition: string | null = null) {
    return /*sql*/ `
            SELECT
                c.*, a.id_vendedor
            FROM compras c
            JOIN articulos a on c.id_articulo = a.id_articulo
            ${whereCondition ?? ""}
            ;
        `;
  }

  async getAll(): Promise<Compra[]> {
    const compras = await this.pool.query<Compra>(this.getQuery());
    console.log(compras);
    return compras.rows;
  }

  async getById(id_compra: number): Promise<Compra> {
    const query = this.getQuery("WHERE c.id_compra = $1");
    const vars = [id_compra];
    const res = await this.pool.query(query, vars);
    console.log("res: " + res);
    if (res.rowCount === 0)
      throw new PC_NotFound(`Compra con id: (${id_compra}) no encontrada.`);
    return res.rows[0];
  }

  async create(data: Partial<Compra>): Promise<Compra> {
    const { id_articulo, id_comprador } = data;
    let query = `
        WITH nueva_compra AS (
            insert into compras (id_articulo, id_comprador)
                VALUES ($1, $2)
                RETURNING *
            )
        SELECT * from nueva_compra;
    `;
    try {
      const res = await this.pool.query(query, [id_articulo, id_comprador]);
      return res.rows[0];
    } catch (e: any) {
      throw new PC_InternalServerError(
        "Error en la creacion de una compra!" + e
      );
    }
  }

  async update(id: number, data: Partial<Compra>): Promise<Compra> {
    throw new PC_NotImplemented();
  }

  async delete(id: number): Promise<void> {
    throw new PC_NotImplemented();
  }
}
