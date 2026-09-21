import { create, getQuestionSet } from "../../../api/evaluation/evaluationApi"

export const evaluationService = {
    attempt: async () => {
        const response = await create()
        return {success: response.data.success, message: response.data.message}
    },

    checkEvaluationStatus: async () => {

    },

    questionSet: async () => {
        const response = await getQuestionSet()
        return response.data
    },
}