import { existsSync, type PathLike } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import type { Persistivel } from "./Persistivel.js";

export class Persistencia<T> implements Persistivel<T> {
	public async verificarPasta(path: PathLike) {
		try {
			await mkdir(path, { recursive: true });
		} catch (err) {
			console.error(err);
		}
	}

	public async criarJson(pathFile: PathLike, fileName: string, dados: object) {
		if (existsSync(pathFile)) {
			throw "Arquivo já existe";
		}

		try {
			await this.verificarPasta(pathFile);
			await writeFile(
				`${pathFile}/${fileName}`,
				JSON.stringify(dados, null, 2),
			);
			console.log("Dados salvos com sucesso");
		} catch (err) {
			console.error(err);
		}
	}

	public async leJson<T>(pathFile: PathLike) {
		if (!existsSync(pathFile)) {
			console.log("Arquivo não encontrado");
			return null;
		}

		const dados: T = JSON.parse(
			await readFile(pathFile, { encoding: "utf-8" }),
		);

		return dados;
	}

	public salvar(_classe: T): Promise<void> {
		throw new Error();
	}

	public carregar(_id: string): Promise<T | null> {
		throw new Error();
	}
}
