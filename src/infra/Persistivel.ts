import type { IPersistivel } from "../domain/interfaces/IPersistivel.js"


export abstract class Persistivel<T> implements IPersistivel<T>{
    async salvar(classe: T): Promise<void> {
        throw new Error()
    }

    async carregar(id: string): Promise<T | null> {
        throw new Error
    }
}