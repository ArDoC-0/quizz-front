import { createSlice } from "@reduxjs/toolkit"
import type { answer } from "../admin/views/Question/Form/Form"

export interface attachment {
    path: string,
    type: string
}
export interface question {
    id: number|string
    question: string | null,
    duration: number | null,
    score: number | null,
    code: string | null,
    is_runnable: boolean | null,
    answers: null | answer[],
    attachments: [] | attachment[]
}

const questionState: { questions: question[] } = {
    questions: [{
        id:0,
        question: '',
        duration: 0,
        score: null,
        code: null,
        is_runnable: null,
        answers: [],
        attachments: []
    }]
}

const questionsSlice = createSlice({
    name: "questions",
    initialState: questionState,
    reducers: {
        setQuestionSet: (state: { questions: question[] }, action: { payload: question[] }) => {
            state.questions = action.payload

        }
    }
})

export const { setQuestionSet } = questionsSlice.actions
export default questionsSlice.reducer