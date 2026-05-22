import api from "../api";
import type { user } from "../auth/authApi";

export type CreateUserForm = {
    name: string;
    first_name: string;
    email: string;
    password: string;
    role_id: number;
    profil?: File;
    professor_id: null | number;
    action_type: string;
};

export type UserForm = {
    name: string;
    first_name: string;
    email: string;
    password: string;
    role_id: number;
    profil?: File;
    professor_id: null | number;
};

type createUserResponse = {
    identifiant: string
    user: user
}
export type trainers = user[]


const userUrls = {
    createuserUrl: '/api/user/create',
    getTrainers: '/api/trainers'
}

export const createUser = async (body: unknown) => {
    // const data = JSON.stringify(body)
    return (await api.post<createUserResponse>(userUrls.createuserUrl, body,
        {
            headers: {"Content-type":"multipart/form-data"},
    }))
}

export const professors = async () => {
    return (await api.get<trainers>(userUrls.getTrainers, {}))
}