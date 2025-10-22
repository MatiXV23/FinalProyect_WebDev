import { BasePgRepository } from "../../models/baseRepository.ts";
import { PC_NotFound, PC_BadRequest, PC_InternalServerError, PC_NotImplemented } from "../../errors/errors.ts";
import type { Pool } from "pg";
import type { Articulo } from "../../models/articuloModel.ts";


// TODO: REALIZAR ESTO ! ! !
export class ArticulosDB extends BasePgRepository<Articulo> {

    constructor(pool: Pool) {
        super(pool)
    }

    #baseQuery = /*sql*/`
                SELECT 
                    u.*
                FROM Articulos u
                `

    async getAll(): Promise<Articulo[]> {
        throw new PC_NotImplemented()
    }
    
    async getById(id:number): Promise<Articulo> {
        throw new PC_NotImplemented()
    }

    async create(data: Partial<Articulo>): Promise<Articulo> {
        throw new PC_NotImplemented()
    }

    async update(id: number, data: Partial<Articulo>): Promise<Articulo> {
        throw new PC_NotImplemented()
    }

    async delete(id: number): Promise<void> {
        throw new PC_NotImplemented()
    }
}