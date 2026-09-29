import { useEffect } from "react"
import { useAppDispatch } from "../../../shared/hooks/hooks"
import type { question, questionState } from "../questionsSlice"
import { incrementCurrentIndex, setCurrentQuestion, type questionTime } from "../questionTimeSlice"
import { addNewQcmAnswer, type qcm_answers } from "../answersSlice"

interface useNext {
    questionsSet: questionState,
    currentIndex: number,
    answerUnit: ()=> void
}

const useNext = () => {
    const dispatch = useAppDispatch()

    const next = ({ questionsSet, currentIndex, answerUnit }: useNext) => {
        if (questionsSet.questions.length > 1) {
            answerUnit
            dispatch(incrementCurrentIndex())

            if(questionsSet.questions.length > 1+currentIndex)
            {
                dispatch(setCurrentQuestion({
                    question: questionsSet.questions[currentIndex + 1],
                    seconds: questionsSet.questions[currentIndex + 1].duration,
                    index: currentIndex + 1
                }))
            }

        }
    }
    return { next }
}

export default useNext