import { Pool } from "pg";


export abstract class BasePgRepository<T> {
    protected pool: Pool
    constructor(pool: Pool){
        this.pool = pool
    }
    abstract getAll(): Promise<T[]>
    
    abstract getById(id:number): Promise<T>

    abstract create(data: Partial<T>): Promise<T>

    abstract update(id: number, data: Partial<T>): Promise<T>

    abstract delete(id: number): Promise<void>
}