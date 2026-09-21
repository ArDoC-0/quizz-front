import { createSlice } from "@reduxjs/toolkit"

export interface submitAnswers {
    evaluation_id: number
    qcm_answers: qcm_answers[] | []
    redaction_answers: redaction_answers[] | []
}

export interface qcm_answers {
    question_id: number,
    answer_ids: number[]
}

export interface redaction_answers {
    question_id: number,
    answer: string
}

const initialState: submitAnswers = {
    evaluation_id: 0,
    qcm_answers: [],
    redaction_answers: []
}

const answersSlice = createSlice({
    name: 'answers',
    initialState: initialState,
    reducers: {
        addNewQcmAnswer: (state: submitAnswers, action: {payload: qcm_answers})=> {
            state.qcm_answers = [
                ...state.qcm_answers,
                action.payload
            ]
        },

        addNewRedactionAnswer: (state: submitAnswers, action: {payload: redaction_answers})=> {
            state.redaction_answers = [
                ...state.redaction_answers,
                action.payload
            ]
        },

        setEvaluationId: (state: submitAnswers, action: {payload: number})=> {
            state.evaluation_id = action.payload
        }
    }
})

export const {addNewQcmAnswer, addNewRedactionAnswer, setEvaluationId} = answersSlice.actions
export default answersSlice.reducer