import type { qcm_answers, redaction_answers } from "../../features/Student/answersSlice"
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

export interface answerUnit {
qcm_answers?: qcm_answers|null|{}
redaction_answers?: redaction_answers|null|{}
}
const urls = {
    attempt: '/api/evaluation/start',
    end: '/api/evaluation/end',
    check: '/api/evaluation/check',
    submit: '/api/answer-unit/submit'
}
export const isEvalAvailable = async () => {
    return await api.get<attempt>(urls.check, {})
}

export const start = async () => {
    return await api.get<evalStart>(urls.attempt, {})
}

export const end = async (evaluation_id: number) => {
    return await api.get<attempt>(`/api/evaluation/${evaluation_id}/end`, {})
}

export const submitAnswerUnit = async (data: answerUnit) => {
    return api.post<unknown>(urls.submit, data, {})
}