import api from "../api"

interface attempt {
    success: Boolean
    message: string
}
const urls = {
    attempt: '/api/evaluation/start',
    questionSet:'/'
}
export const create = async () => {
    return await api.get<attempt>(urls.attempt, {})
}

export const getQuestionSet = async () => {
    return await api.get<attempt>(urls.questionSet, {})
}