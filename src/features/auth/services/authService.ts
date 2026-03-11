import api from "../../../api/api";
import { attemptAuth, type user } from "../../../api/auth/authApi";

export const authServices = {
    // 1. Initialise la protection CSRF
    async getCsrfCookie() {
        return await api.get('/sanctum/csrf-cookie', {});
    },

    // 2. Connecte l'utilisateur
    async login(credentials: { identifiant: string; password: string }) {
        return await attemptAuth(credentials);
    },

    // 3. Récupère l'utilisateur connecté
    async me() {
        return await api.get<user>('/api/user', {});
    },

    // 4. Déconnexion
    async logout() {
        return await api.post('/logout', null, {});
    }
}