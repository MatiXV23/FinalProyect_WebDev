class PC_Error extends Error {
    public error: string
    public statusCode: number

        constructor(message: string, statusCode: number, error: string){
        super(message)
        this.statusCode = statusCode
        this.error = error
    }
}

class PC_NotImplemented extends PC_Error {
    constructor(message?: string){
        super(message || "Funcionalidad sin implementacion aun", 501, "PC_NotImplemented")
    }
}

export {PC_NotImplemented}