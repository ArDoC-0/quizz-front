import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

interface Timer {
    seconds: number
}

const globalTimerState = {
    seconds: 360
}

const globalTimerSlice = createSlice({
    name:'globalTimer',
    initialState: globalTimerState,
    reducers: {
        setTime :(state: Timer, action: {payload: Timer}) => {
            state.seconds = action.payload.seconds
        },
        decrementTime :(state: Timer) => {
            if(state.seconds>0){
                state.seconds -= 1
            }
        },
        resetTime: ()=> {

        }
    },
})


export const {setTime, decrementTime} = globalTimerSlice.actions
export default globalTimerSlice.reducer