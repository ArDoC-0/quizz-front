import api from "../api";
import type { user } from "../auth/authApi";

export type UserForm = {
    name: string;
    first_name: string;
    email: string;
    password: string;
    role: number;
    profil: string;
    photo?: File;
    professor_id: null|number,

};

export type trainers = user[]


const userUrls = {
    createuserUrl: '/user/create',
    getUsers: '/trainers'
}

export const createUser = async (body: UserForm)=> {
    const data = JSON.stringify(body)
    return (await api.post<{identifiant: string}>(userUrls.createuserUrl, data, {}))
}

export const professors = async () => {
    return (await api.get<trainers>(userUrls.getUsers, {}))
}