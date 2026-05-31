import type { GenericFormData } from "axios"
import type { form } from "../../features/admin/views/Question/Form/Form"
import api from "../api"

const urls = {
    create: '/api/question/create'
}

export const create = async (data: GenericFormData) => {
    return await api.post(urls.create, data, {})
}