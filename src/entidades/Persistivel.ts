import type { IPersistivel } from "../types/IPersistivel.js";

export abstract class Persistivel implements IPersistivel{
    async salvar(): Promise<void> {
        throw new Error()
    }

    async carregar<T>(): Promise<T | null> {
        throw new Error
    }
}