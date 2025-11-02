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

  async create(data: Articulo): Promise<Articulo> {
    const {
      id_vendedor,
      id_categoria,
      usado,
      con_envio,
      nombre,
      precio,
      moneda,
      descripcion,
      foto_url = "https://img.freepik.com/vector-premium/icono-perfil-avatar_188544-4755.jpg?w=1060",
    } = data;

    let query = /*sql*/ `
                    WITH nuevo_usuario AS (
                        insert into usuarios (is_admin, email, nombres, apellidos, id_departamento, direccion, nro_documento, foto_url)
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                            RETURNING *
                        ),
                        cred AS (
                            INSERT INTO credenciales (id_usuario, password_hash)
                            SELECT id_usuario, crypt($9, gen_salt('bf'))
                            FROM nuevo_usuario
                            RETURNING id_usuario
                        )
                    SELECT * from nuevo_usuario;`;
    try {
      const res = await this.pool.query(query, [
        id_vendedor,
        id_categoria,
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
      if (err.code !== "23505") throw new PC_InternalServerError();

      switch (err.constraint) {
        case "usuarios_nro_documento_key":
          throw new PC_BadRequest("Ese numero de documento ya esta en uso");

        case "usuarios_email_key":
          throw new PC_BadRequest("Ese email ya esta en uso");

        default:
          throw new PC_BadRequest("Alguna key esta duplicada");
      }
    }
  }

  async update(id: number, data: Partial<Articulo>): Promise<Articulo> {
    let query = `UPDATE usuarios
                        SET
                    `;
    let cont = 2;
    let vars: any[] = [id];

    let carrito_modified = false;
    for (const key in data) {
      const k = key as keyof Articulo;

      // if (data[k] === undefined || k === "id_usuario" || k === "reputacion")
      //   continue;

      // if (k === "articulos_carrito") {
      //   carrito_modified = true;
      //   continue;
      // }

      query += `${k} = $${cont},`;
      vars.push(data[k]);
      cont++;
    }
    query = query.slice(0, -1);

    query += `  WHERE id_usuario = $1;`;

    try {
      const res = await this.pool.query(query, vars);

      if (res.rowCount === 0) {
        throw new PC_NotFound(`Usuario con id (${id}) no encontrado`);
      }

      if (carrito_modified) {
        // Elimina los articulos que no esten en el array
        await this.pool.query(/*sql*/ `
                DELETE FROM articulos_carritos
                WHERE id_usuario = $1
                AND id_articulo NOT IN (SELECT UNNEST($2::int[]));
                `);
        // [id, data.articulos_carrito]

        // Inserta los articulos que faltan
        await this.pool.query(/*sql*/ `
                INSERT INTO articulos_carritos (id_usuario, id_articulo)
                SELECT $1, UNNEST($2::int[])
                ON CONFLICT DO NOTHING;
                `);
        // [id, data.articulos_carrito]
      }

      return await this.getById(id);
    } catch (err: any) {
      if (err.code !== "23505") throw new PC_InternalServerError();

      switch (err.constraint) {
        case "usuarios_nro_documento_key":
          throw new PC_BadRequest("Ese numero de documento ya esta en uso");

        case "usuarios_email_key":
          throw new PC_BadRequest("Ese email ya esta en uso");

        default:
          throw new PC_BadRequest("Alguna key esta duplicada");
      }
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
