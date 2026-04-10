import { authService } from "../../service/AuthService.js";
import { rl } from "../index.js";

export async function login() {
	const userName = await rl.perguntar("Digite o usuário: ");
	const userSenha = await rl.perguntar("Digite a senha: ");

	const auth = new authService();

	const autenticado = await auth.login(userName, userSenha);

	return autenticado;
}
