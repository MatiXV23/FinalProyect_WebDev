import { Pool, type PoolConfig } from "pg";  

const pgConfig: PoolConfig = {
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 1000,
    max: 10,
    min: 0,
    allowExitOnIdle: false,
    maxLifetimeSeconds: 0
}

export const myPool = new Pool(pgConfig)