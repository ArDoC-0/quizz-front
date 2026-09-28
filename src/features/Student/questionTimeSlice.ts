import { createSlice } from "@reduxjs/toolkit"
import type { question } from "./questionsSlice"

export interface questionTime {
    question: null | question
    seconds: number | null
    index: number | null

}


const singleTimerState = {
    question: {
        id: 0,
        question: '',
        duration: 9,
        score: null,
        code: null,
        is_runnable: null,
        answers: [],
        attachments: []
    },
    seconds: 9,
    index: 0
}

const questionTimeSlice = createSlice({
    name: 'singleTimerState',
    initialState: singleTimerState,
    reducers: {
        setCurrentQuestion: (state: questionTime, action: { payload: questionTime }) => {
            state.seconds = action.payload.seconds
            state.question = action.payload.question
            state.index = action.payload.index
        },
        decrementSingleTime: (state: questionTime) => {
            if (state.seconds > 0) {
                state.seconds -= 1
            }
        },
        incrementCurrentIndex: (state: questionTime) => {
            state.index += 1

        }
    }
})

export const { setCurrentQuestion, incrementCurrentIndex, decrementSingleTime } = questionTimeSlice.actions
export default questionTimeSlice.reducer