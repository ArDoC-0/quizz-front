import type { GenericFormData } from "axios"
import api from "../api"

const urls = {
    create: '/api/question/create',
    subjects: '/api/subjects',
    createSubject: '/api/subject',
    deleteSubject: '/api/subject'

}

export const create = async (data: GenericFormData) => {
    return await api.post(urls.create, data, {})
}

export const subjects = async () => {
    return await api.get(urls.subjects, {})
}

export const createSubject = async (name: {name: string}) => {
    return await api.post(urls.createSubject, name, {})
}

export const deleteSubject = async (id: number) => {
    return await api.delete(urls.deleteSubject+`/${id}`, {})
}


