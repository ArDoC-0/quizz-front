import type { question } from "../../features/Student/questionsSlice"
import api from "../api"

interface attempt {
    success: boolean
    message: string
}

interface evalStart {
    success: boolean,
    questions: question[]
    evaluationId: number,
    timeLeft: number,
    current_index: number
}
const urls = {
    attempt: '/api/evaluation/start',
    end: '/api/evaluation/end',
    check: '/api/evaluation/check'
}
export const isEvalAvailable = async () => {
    return await api.get<attempt>(urls.check, {})
}

export const start = async () => {
    return await api.get<evalStart>(urls.attempt, {})
}

export const end = async () => {
    return await api.get<attempt>(urls.end, {})
}