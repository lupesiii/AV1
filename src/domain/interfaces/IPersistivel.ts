export interface IPersistivel<T> {
    salvar(classe: T): Promise<void>;
    carregar(id: string): Promise<T | null>;
}