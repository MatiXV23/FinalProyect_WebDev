import { BasePgRepository } from "../../models/common/baseRepository.ts";
import {
  PC_NotFound,
  PC_BadRequest,
  PC_InternalServerError,
  PC_NotImplemented,
} from "../../errors/errors.ts";
import type { Pool } from "pg";
import type { Articulo } from "../../models/market/articuloModel.ts";

// TODO: REALIZAR ESTO ! ! !
export class ArticulosDB extends BasePgRepository<Articulo> {
  constructor(pool: Pool) {
    super(pool);
  }

  #baseQuery = /*sql*/ `
                SELECT 
                    u.*
                FROM Articulos u
                `;

  async getAll(): Promise<Articulo[]> {
    const articles = await this.pool.query<Articulo>(
      this.#baseQuery + "ORDER BY id_articulo;"
    );

    return articles.rows;
  }

  async getById(id: number): Promise<Articulo> {
    const query = this.#baseQuery + `WHERE u.id_articulo = $1;`;
    const vars = [id];
    const res = await this.pool.query<Articulo>(query, vars);

    if (res.rowCount === 0)
      throw new PC_NotFound(`Articulo con id (${id}) no encontrado`);
    return res.rows[0];
  }

  async create(data: Partial<Articulo>): Promise<Articulo> {
    const { nombre, categorias, descripcion, precio } = data;
    let query = /*sql*/ ` 
                    WITH nuevo_articulo AS (
                        INSERT INTO articulos (nombre, categorias, precio, descripcion)
                            VALUES ($1, $2, $3, $4)
                            RETURNING id_usuario
                        ),
                        cred AS (
                            INSERT INTO credenciales (id_usuario, password_hash)
                            SELECT id_usuario, crypt('pass', gen_salt('bf'))
                            FROM nuevo_usuario
                            RETURNING id_usuario
                        )
                    SELECT id_usuario from cred;`;
    try {
      const res = await this.pool.query(query, [
        nombre,
        categorias,
        descripcion,
        precio,
      ]);
      const article: Articulo = await this.getById(res.rows[0].id_usuario);
      return article;
    } catch (err: any) {
      if (err.code === "23505") {
        throw new PC_BadRequest("El username ya existe");
      }
      throw new PC_InternalServerError();
    }
  }

  async update(id: number, data: Partial<Articulo>): Promise<Articulo> {
    throw new PC_NotImplemented();
  }

  async delete(id: number): Promise<void> {
    throw new PC_NotImplemented();
  }
}
