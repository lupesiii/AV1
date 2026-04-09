export interface IPersistivel {
    salvar(): Promise<void>;
    carregar<T>(): Promise<T | null>;
}