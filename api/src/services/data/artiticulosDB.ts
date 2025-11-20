import { BasePgRepository } from "../../models/common/baseRepository.js";
import {
  PC_NotFound,
  PC_BadRequest,
  PC_InternalServerError,
} from "../../errors/errors.js";
import type { Pool } from "pg";
import type {
  Articulo,
  ArticuloQuery,
} from "../../models/market/articuloModel.js";

// // TODO: ARREGLAR ESTO ! ! !
export class ArticulosDB extends BasePgRepository<Articulo> {
  constructor(pool: Pool) {
    super(pool);
  }

  private getQuery(whereCondition: string | null = null) {
    const query = /*sql*/ `
            SELECT a.* from articulos a
            ${whereCondition ?? ""}
            ;
        `;

    return query;
  }

  async getAll(): Promise<Articulo[]> {
    const users = await this.pool.query<Articulo>(
      this.getQuery(`LEFT JOIN compras c ON a.id_articulo = c.id_articulo
                                                                  WHERE c.id_articulo IS NULL`)
    );
    return users.rows;
  }

  async findAll(query: ArticuloQuery): Promise<Articulo[]> {
    const { id_categoria, id_departamento, id_vendedor } = query;
    let baseWhereCond = `LEFT JOIN compras c ON a.id_articulo = c.id_articulo `;
    let whereCondition = "";
    let vars: any[] = [];

    if (id_categoria || id_departamento || id_vendedor) {
      let cont = 1;
      if (id_departamento) {
        whereCondition = /*sql*/ `
          JOIN usuarios u
          ON u.id_usuario = a.id_vendedor
          WHERE u.id_departamento = $1
        `;
        cont++;
        vars.push(id_departamento);
      }
      if (id_categoria) {
        whereCondition += whereCondition
          ? `AND a.id_categoria = $${cont} `
          : `WHERE a.id_categoria = $${cont} `;
        cont++;
        vars.push(id_categoria);
      }
      if (id_vendedor) {
        whereCondition += whereCondition
          ? `AND a.id_vendedor = $${cont} `
          : `WHERE a.id_vendedor = $${cont} `;
        cont++;
        vars.push(id_vendedor);
      }
    }

    whereCondition += whereCondition
      ? `AND c.id_articulo IS NULL`
      : `WHERE c.id_articulo IS NULL`;
    whereCondition = baseWhereCond + whereCondition;
    const users = await this.pool.query<Articulo>(
      this.getQuery(whereCondition),
      vars
    );
    return users.rows;
  }

  async getById(id: number): Promise<Articulo> {
    const query = this.getQuery(`WHERE a.id_articulo = $1`);
    const vars = [id];

    const res = await this.pool.query<Articulo>(query, vars);

    if (res.rowCount === 0)
      throw new PC_NotFound(`Articulo con id (${id}) no encontrado`);
    return res.rows[0]!;
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

    let query = `UPDATE articulos
                SET
                  id_categoria = COALESCE($2, id_categoria),
                  id_vendedor = COALESCE($3, id_vendedor),
                  usado = COALESCE($4, usado),
                  con_envio = COALESCE($5, con_envio),
                  nombre = COALESCE($6, nombre),
                  precio = COALESCE($7, precio),
                  moneda = COALESCE($8, moneda),
                  descripcion = COALESCE($9, descripcion),
                  foto_url = COALESCE($10, foto_url)
                WHERE id_articulo = $1
                RETURNING *;
                    `;

    try {
      const res = await this.pool.query(query, [
        id,
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

      if (res.rowCount === 0) {
        throw new PC_NotFound(`Articulo con id (${id}) no encontrado`);
      }

      return res.rows[0];
    } catch (err: any) {
      if (err instanceof PC_NotFound) throw err;
      throw new PC_InternalServerError();
    }
  }

  async delete(id: number): Promise<void> {
    const query = `DELETE FROM articulos
                        WHERE id_articulo = $1;`;
    const res = await this.pool.query<Articulo>(query, [id]);

    if (res.rowCount === 0)
      throw new PC_NotFound(`Articulo de id ${id}, no existe. Ignorando`);
    console.log(res);
  }
}
