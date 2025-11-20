import { BasePgRepository } from "../../models/common/baseRepository.js";
import type {
  JWTUsuario,
  Usuario,
  UsuarioPost,
  UsuarioQuery,
} from "../../models/market/usuarioModel.js";
import type { Credenciales } from "../../models/market/credencialesModel.js";
import {
  PC_NotFound,
  PC_BadRequest,
  PC_InternalServerError,
} from "../../errors/errors.js";
import type { Pool } from "pg";
import fastify from "fastify";

// TODO: ARREGLAR ESTO ! ! !
export class UsuariosDB extends BasePgRepository<Usuario> {
  constructor(pool: Pool) {
    super(pool);
  }

  private getQuery(whereCondition: string | null = null) {
    const query = /*sql*/ `
            SELECT
                u.id_usuario,
                u.email,
                u.nombres,
                u.apellidos,
                u.direccion,
                u.is_admin,
                u.nro_documento,
                u.id_departamento,
                u.foto_url,
                COALESCE(AVG(r.reputacion), 0) AS reputacion,
                COALESCE(
                    ARRAY_AGG(DISTINCT ac.id_articulo)
                    FILTER (WHERE ac.id_articulo IS NOT NULL),
                    '{}'
            ) AS articulos_carrito
            FROM usuarios u
            LEFT JOIN resenias r ON r.id_vendedor = u.id_usuario
            LEFT JOIN articulos_carritos ac ON ac.id_usuario = u.id_usuario
            ${whereCondition ?? ""}
            
            GROUP BY
                u.id_usuario, u.email, u.id_departamento, u.nombres, u.apellidos, u.direccion, u.is_admin, u.nro_documento, u.foto_url;
        `;
    return query;
  }

  async getAll(): Promise<Usuario[]> {
    try {
      const users = await this.pool.query<Usuario>(this.getQuery());
      return users.rows;
    } catch (e) {
      throw new PC_InternalServerError();
    }
  }

  async findAll(query: UsuarioQuery): Promise<Usuario[]> {
    const { email, nro_documento } = query;
    let whereCondition = "";
    let vars: any[] = [];

    if (email || nro_documento) {
      let cont = 1;
      if (email) {
        whereCondition = /*sql*/ `
              WHERE u.email = $1
            `;
        cont++;
        vars.push(email);
      }
      if (nro_documento) {
        whereCondition += whereCondition
          ? `OR u.nro_documento = $${cont} `
          : `WHERE u.nro_documento = $${cont} `;
        cont++;
        vars.push(nro_documento);
      }
    }
    console.log({ whereCondition });
    const users = await this.pool.query<Usuario>(
      this.getQuery(whereCondition),
      vars
    );
    return users.rows;
  }

  async getById(id: number): Promise<Usuario> {
    const query = this.getQuery(`WHERE u.id_usuario = $1`);
    const vars = [id];
    const res = await this.pool.query<Usuario>(query, vars);

    if (res.rowCount === 0)
      throw new PC_NotFound(`Usuario con id (${id}) no encontrado`);
    return res.rows[0]!;
  }

  async create(data: UsuarioPost): Promise<Usuario> {
    const {
      is_admin,
      email,
      nombres,
      apellidos,
      id_departamento,
      direccion,
      nro_documento,
      password,
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
        is_admin,
        email,
        nombres,
        apellidos,
        id_departamento,
        direccion,
        nro_documento,
        foto_url,
        password,
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

  async update(id: number, data: Partial<Usuario>): Promise<Usuario> {
    let query = `UPDATE usuarios
                        SET 
                    `;
    let cont = 2;
    let vars: any[] = [id];

    let carrito_modified = false;
    for (const key in data) {
      const k = key as keyof Usuario;

      if (data[k] === undefined || k === "id_usuario" || k === "reputacion")
        continue;

      if (k === "articulos_carrito") {
        carrito_modified = true;
        continue;
      }

      query += `${k} = $${cont},`;
      vars.push(data[k]);
      cont++;
    }
    query = query.slice(0, -1);

    query += `  WHERE id_usuario = $1;`;

    try {
      if (cont > 2) {
        const res = await this.pool.query(query, vars);

        if (res.rowCount === 0) {
          throw new PC_NotFound(`Usuario con id (${id}) no encontrado`);
        }
      }

      if (carrito_modified) {
        // Elimina los articulos que no esten en el array
        const res2 = await this.pool.query(
          /*sql*/ `
                DELETE FROM articulos_carritos
                WHERE id_usuario = $1
                AND id_articulo NOT IN (SELECT UNNEST($2::int[]));
                `,
          [id, data.articulos_carrito]
        );

        // Inserta los articulos que faltan
        const res3 = await this.pool.query(
          /*sql*/ `
                INSERT INTO articulos_carritos (id_usuario, id_articulo)
                SELECT $1, UNNEST($2::int[])
                ON CONFLICT DO NOTHING;
                `,
          [id, data.articulos_carrito]
        );
      }

      return await this.getById(id);
    } catch (err: any) {
      if (err instanceof PC_NotFound) throw err;

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
    try {
      const query = `DELETE FROM usuarios
                            WHERE id_usuario = $1;`;
      const res = await this.pool.query<Usuario>(query, [id]);

      if (res.rowCount === 0)
        throw new PC_NotFound(`Usuario de id ${id}, no existe. Ignorando`);
      console.log(res);
    } catch (err) {
      if (err instanceof PC_NotFound) throw err;
      throw new PC_InternalServerError();
    }
  }

  async getUserByCredentials(credenciales: Credenciales): Promise<Usuario> {
    const query = this
      .getQuery(`JOIN credenciales c ON c.id_usuario = u.id_usuario
                        WHERE u.email = $1 AND c.password_hash = crypt($2, password_hash)`);
    const vars = [credenciales.email, credenciales.password];
    try {
      const res = await this.pool.query<Usuario>(query, vars);
      console.info("res:", res, "credenciales:", credenciales);
      if (res.rowCount === 0) throw new PC_NotFound(`Credenciales Incorrectas`);

      return res.rows[0]!;
    } catch (err) {
      if (err instanceof PC_NotFound) throw err;
      throw new PC_InternalServerError();
    }
  }

  async updatePass(id: number, password: string) {
    const query = /*sql*/ `UPDATE credenciales
                    SET password_hash = crypt($2, gen_salt('bf'))
                    WHERE id_usuario = $1;
                    `;
    const vars = [id, password];

    try {
      const res = await this.pool.query(query, vars);
      console.log(res);
    } catch (e) {
      throw new PC_InternalServerError();
    }
  }
}
