import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import globalTimerSlice from "../features/Student/globalTimerSlice"
import questionTimeSlice from "../features/Student/questionTimeSlice"
import questionsSlice from "../features/Student/questionsSlice"
import answersSlice from "../features/Student/answersSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        globalTimer: globalTimerSlice,
        questionTimeSlice: questionTimeSlice,
        questions: questionsSlice,
        answers: answersSlice
    },
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store