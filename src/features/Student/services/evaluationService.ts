import {  isEvalAvailable, start,end, submitAnswerUnit, type answerUnit } from "../../../api/evaluation/evaluationApi"
import { useAppDispatch } from "../../../shared/hooks/hooks"
import { setTime } from "../globalTimerSlice"
import { setQuestionSet } from "../questionsSlice"

export const evaluationService = {

    checkEvaluationStatus: async () => {
        return (await isEvalAvailable()).data
    },

    start: async () => {
        const response = await start()
        return response.data

    },

    submitAnswerUnit: async (data: answerUnit) => {
        return submitAnswerUnit(data)
    },

    end: async (evaluation_id: number) => {
        return end(evaluation_id)
    }
}