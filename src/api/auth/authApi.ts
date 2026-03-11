import api from "../api"

const urls = {
    loginurl: "/login",
    csrfurl: "/sanctum/csrf-cookie"
}
type loginBody = {
    identifiant: string;
    password: string
}
export type user = {
    name: string
    first_name: string
    identifiant: string
    profil: string
}

export const attemptAuth = async (body: loginBody) => {
    await api.get(urls.csrfurl, {})
    return api.post<user>(urls.loginurl, body, {})
}

export const logOut = async () => {
    return await api.get('/logout', {});
}