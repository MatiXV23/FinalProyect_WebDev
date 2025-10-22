import { BasePgRepository } from "../../models/baseRepository.ts";
import type { Usuario } from "../../models/usuarioModel.ts";
import type { Credenciales } from "../../models/credencialesModel.ts";
import { PC_NotFound, PC_BadRequest, PC_InternalServerError } from "../../errors/errors.ts";
import type { Pool } from "pg";


// TODO: ARREGLAR ESTO ! ! !
export class UsuariosDB extends BasePgRepository<Usuario> {

    constructor(pool: Pool) {
        super(pool)
    }

    #baseQuery = /*sql*/`
                SELECT 
                    u.*
                FROM usuarios u
                `

    async getAll(): Promise<Usuario[]> {
        const users = await this.pool.query<Usuario>(this.#baseQuery+ 'ORDER BY id_usuario;')

        return users.rows
    }
    
    async getById(id:number): Promise<Usuario> {
        const query = this.#baseQuery + `WHERE u.id_usuario = $1;`
        const vars = [id]
        const res = await this.pool.query<Usuario>(query, vars)
        
        if (res.rowCount === 0) throw new PC_NotFound(`Usuario con id (${id}) no encontrado`)
        return res.rows[0]
    }

    async create(data: Partial<Usuario>): Promise<Usuario> {
        const {administrador, email, nombre, apellido} = data
        let query = /*sql*/` 
                    WITH nuevo_usuario AS (
                        INSERT INTO usuarios (is_admin, username, email, nombres)
                            VALUES ($1, $2, $3, $4)
                            RETURNING id_usuario
                        ),
                        cred AS (
                            INSERT INTO credenciales (id_usuario, password_hash)
                            SELECT id_usuario, crypt('pass', gen_salt('bf'))
                            FROM nuevo_usuario
                            RETURNING id_usuario
                        )
                    SELECT id_usuario from cred;`
        try{
            const res = await this.pool.query(query, [administrador, email, nombre, apellido])
            const user:Usuario = await this.getById(res.rows[0].id_usuario)
            return user
        }catch(err: any){
            if (err.code === "23505") {
                throw new PC_BadRequest("El username ya existe")
            }
            throw new PC_InternalServerError()
        }
    }

    async update(id: number, data: Partial<Usuario>): Promise<Usuario> {

        let query = `UPDATE usuarios
                        SET 
                    `
        let cont = 2;
        let vars: any[] = [id]
        
        for (const key in data){
            const k = key as keyof Usuario
            if (data[k]===undefined || k === 'id_usuario') continue

            query += `${k} = $${cont},`
            vars.push(data[k])
            cont++
        }
        query = query.slice(0, -1)

        query += `  WHERE id_usuario = $1;`
        try {
            const res = await this.pool.query(query, vars)

            if (res.rowCount === 0) {
                throw new PC_NotFound(`Usuario con id (${id}) no encontrado`);
            }

            return await this.getById(id);
        }catch(err: any){
            if (err.code === "23505") {
            throw new PC_BadRequest("El username o email ya existe");
        }
        throw err;
        }
    }

    async delete(id: number): Promise<void> {
        const query =  `DELETE FROM usuarios
                        WHERE id_usuario = $1;`
        const res = await this.pool.query<Usuario>(query, [id])

        if (res.rowCount === 0) throw new PC_NotFound(`Usuario de id ${id}, no existe. Ignorando`)
        console.log(res)
    }
    
    async getUserByCredentials(credenciales: Credenciales): Promise<Usuario> {
        const query = this.#baseQuery + `JOIN credenciales c ON c.id_usuario = u.id_usuario
                                        WHERE u.email = $1 AND c.password_hash = crypt($2, password_hash)
                                        GROUP BY u.id_usuario;`
        const vars = [credenciales.email, credenciales.password]
        const res = await this.pool.query<Usuario>(query, vars)
        
        if (res.rowCount === 0) throw new PC_NotFound(`Credenciales Incorrectas`)

        return res.rows[0]
    }
}