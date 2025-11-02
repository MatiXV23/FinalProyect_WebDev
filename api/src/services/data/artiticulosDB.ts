import { BasePgRepository } from "../../models/common/baseRepository.ts";
import {
  PC_NotFound,
  PC_BadRequest,
  PC_InternalServerError,
} from "../../errors/errors.ts";
import type { Pool } from "pg";
import type { Articulo } from "../../models/market/articuloModel.ts";

// // TODO: ARREGLAR ESTO ! ! !
export class ArticulosDB extends BasePgRepository<Articulo> {
  constructor(pool: Pool) {
    super(pool);
  }

  private getQuery(whereCondition: string | null = null) {
    const query = /*sql*/ `
            SELECT * from articulos a
            ${whereCondition ?? ""}
        `;

    return query;
  }

  async getAll(): Promise<Articulo[]> {
    const users = await this.pool.query<Articulo>(this.getQuery());
    return users.rows;
  }

  async getAllByCategory(id_categoria: number): Promise<Articulo[]> {
    const users = await this.pool.query<Articulo>(
      this.getQuery("WHERE a.id_categoria = $1;"),
      [id_categoria]
    );
    return users.rows;
  }

  async getById(id: number): Promise<Articulo> {
    const query = this.getQuery(`WHERE a.id_articulo = $1`);
    const vars = [id];
    console.info(query, "id: ", id);
    const res = await this.pool.query<Articulo>(query, vars);

    if (res.rowCount === 0)
      throw new PC_NotFound(`Articulo con id (${id}) no encontrado`);
    return res.rows[0];
  }

  async create(data: Partial<Articulo>): Promise<Articulo> {
    const {
      id_vendedor,
      id_categoria,
      usado,
      con_envio,
      nombre,
      precio,
      moneda,
      descripcion,
      foto_url,
    } = data;

    let query = `
                    WITH nuevo_articulo AS (
                        insert into articulos (id_categoria, id_vendedor, usado, con_envio, nombre, precio, moneda, descripcion, foto_url)
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                            RETURNING *
                        )
                    SELECT * from nuevo_articulo;`;
    try {
      const res = await this.pool.query(query, [
        id_categoria,
        id_vendedor,
        usado,
        con_envio,
        nombre,
        precio,
        moneda,
        descripcion,
        foto_url,
      ]);
      return res.rows[0];
    } catch (err: any) {
      throw new PC_InternalServerError("Error en la creacion de un articulo!");
    }
  }

  async update(id: number, data: Partial<Articulo>): Promise<Articulo> {
    let query = `UPDATE articulos
                        SET
                    `;
    let vars: any[] = [id];

    query += `  WHERE a.id_articulo = $1;`;

    try {
      const res = await this.pool.query(query, vars);

      if (res.rowCount === 0) {
        throw new PC_NotFound(`Articulo con id (${id}) no encontrado`);
      }

      return await this.getById(id);
    } catch (err: any) {
      throw new PC_InternalServerError("Error al modificar articulo");
    }
  }

  async delete(id: number): Promise<void> {
    const query = `DELETE FROM usuarios
                        WHERE id_usuario = $1;`;
    const res = await this.pool.query<Articulo>(query, [id]);

    if (res.rowCount === 0)
      throw new PC_NotFound(`Usuario de id ${id}, no existe. Ignorando`);
    console.log(res);
  }
}
