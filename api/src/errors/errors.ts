class PC_Error extends Error {
    public error: string
    public statusCode: number

    constructor(message: string, statusCode: number, error: string){
        super(message)
        this.statusCode = statusCode
        this.error = error
    }
}

class PC_BadRequest extends PC_Error {
    constructor(message?: string){
        super(message || "Hay algo mal en la consulta", 400, "PC_BadRequest")
    }
}

class PC_NoAuthorized extends PC_Error {
    constructor(message?: string){
        super(message || "No tienes permisos para realizar esta consulta", 401, "PC_NoAuthorized")
    }
}

class PC_Forbidden extends PC_Error {
    constructor(message?: string){
        super(message || "Consulta Prohibida", 403, "PC_Forbidden")
    }
}

class PC_NotFound extends PC_Error {
    constructor(message?: string){
        super(message || "Recurso no encontrado", 404, "PC_NotFound")
    }
}

class PC_InternalServerError extends PC_Error {
    constructor(message?: string){
        super(message || "Error en el servidor", 500, "PC_InternalServerError")
    }
}

class PC_NotImplemented extends PC_Error {
    constructor(message?: string){
        super(message || "Funcionalidad sin implementacion aun", 501, "PC_NotImplemented")
    }
}

export { PC_BadRequest, PC_Error, PC_Forbidden, PC_InternalServerError, PC_NoAuthorized, PC_NotFound, PC_NotImplemented }