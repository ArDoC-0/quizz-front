import React, { useEffect, useState } from 'react'
import './Components/scss/__evaluation.scss'
import { ChevronRight, FileIcon } from 'lucide-react'
import Timer from './Components/Timer'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/hooks'
import { decrementTime, setTime } from './globalTimerSlice'
import SingleTimer from './Components/SingleTimer'
import { decrementSingleTime, incrementCurrentIndex, setCurrentQuestion } from './questionTimeSlice'
import { questions } from '../../shared/constants/constants'
import { setQuestionSet, type attachment } from './questionsSlice'
import { Link } from 'react-router-dom'
import { getNameFromPath } from '../../shared/utils/utils'
import { downloadAttachment } from '../admin/services/questionService'
import type { answer } from '../admin/views/Question/Form/Form'
import { addNewQcmAnswer, addNewRedactionAnswer, type qcm_answers, type redaction_answers, type submitAnswers } from './answersSlice'

function Evaluation() {

    const globalTime = useAppSelector((state) => state.globalTimer.seconds)
    const singleTime = useAppSelector((state) => state.questionTimeSlice.seconds)
    const currentIndex = useAppSelector((state) => state.questionTimeSlice.index)
    const currentQuestion = useAppSelector((state) => state.questionTimeSlice.question)
    const dispatch = useAppDispatch()
    const questionsSet = useAppSelector(state => state.questions)
    const [isAnswerValid, setIsAnswerValid] = useState(false)
    const [qcmanswerUnit, setQcmAnswerUnit] = useState<qcm_answers>({
        answer_ids: [],
        question_id: 0
    })

    const [redactionAnswerUnit, setredactionAnswerUnit] = useState<redaction_answers>({
        answer: '',
        question_id: 0
    })
    const handleOnChange = (e: React.ChangeEvent) => {
        const { name, value } = e.target as HTMLInputElement
        if (name == 'qcm') {
            setQcmAnswerUnit({
                question_id: currentQuestion.id,
                answer_ids: Array.from(e.target.selectedOptions, option => Number(option.value))
            })

        }

        if (name == 'redaction') {
            setredactionAnswerUnit({
                question_id: currentQuestion.id,
                answer: value
            })
        }
    }

    const next = () => {
            console.log(qcmanswerUnit)

        if (qcmanswerUnit.answer_ids.length > 0) {
            dispatch(addNewQcmAnswer(qcmanswerUnit))
            setQcmAnswerUnit({
                answer_ids: [],
                question_id: 0
            })
            dispatch(incrementCurrentIndex())
            dispatch(setCurrentQuestion({
                    question: questionsSet.questions[currentIndex + 1],
                    seconds: questionsSet.questions[currentIndex + 1].duration,
                    index: currentIndex + 1
                }))
        } else {
            if (redactionAnswerUnit.answer.length > 0) {
                dispatch(addNewRedactionAnswer(redactionAnswerUnit))
                setredactionAnswerUnit({
                    answer: '',
                    question_id: 0
                })

                dispatch(incrementCurrentIndex())
                dispatch(setCurrentQuestion({
                    question: questionsSet.questions[currentIndex + 1],
                    seconds: questionsSet.questions[currentIndex + 1].duration,
                    index: currentIndex + 1
                }))
            }
        }

    }
    const downloadFile = async (path: string) => {
        const file = await downloadAttachment(path)
        const url = URL.createObjectURL(file)
        const link = document.createElement('a')
        link.href = url
        link.download = getNameFromPath(path)
        URL.revokeObjectURL(url)

        link.click()
    }

    useEffect(() => {
        dispatch(setQuestionSet(questions))

        console.log(globalTime)

        const global = setInterval(() => {
            dispatch(decrementTime())
        }, 1000)
        console.log(questionsSet)
        return () => {
            clearInterval(global)
        }
    }, [])
    useEffect(() => {
        console.log(currentQuestion)
        dispatch(setCurrentQuestion({
            question: questionsSet.questions[currentIndex],
            index: currentIndex,
            seconds: questionsSet.questions[currentIndex].duration
        }))

        const timer = setInterval(() => {
            dispatch(decrementSingleTime())
        }, 1000)


        return () => {
            clearInterval(timer)
        }
    }, [questionsSet, dispatch])
    return (
        <div className='bg-white h-dvh items-center'>
            <div className=" py-4">
                <div className='flex items-center justify-between gap-4 py-2 w-[60%] mx-auto'>
                    <div className="w-full">
                        <h3 className="text-right font-semibold w-25 text-green-400">
                            25%
                        </h3>
                        <div className="w-90 bg-gray-300 rounded-xl overflow-hidden">
                            <div className="w-65 p-1 bg-green-400">

                            </div>
                        </div>
                    </div>

                    <Timer remainingTime={globalTime} />
                </div>
                <div className="body-section m-auto min-h-[600px] w-full px-4 bg-gray-50">
                    <div className="w-[60vw] mx-auto">

                        <div className="py-4 question">
                            <p className="text-center text-gray-700 text-md font-semibold mb-1">{`Question ${currentIndex+1}`}</p>
                            <p className="text-gray-900  font-bold text-xl mb-4 text-center">
                                <SingleTimer remainingTime={singleTime} />
                            </p>

                            <p className="text-gray-900 mb-4 font-medium shadow-gray-400 shadow-">
                                {currentQuestion.question}
                            </p>
                            {
                                currentQuestion.code ? (<div className="h-[250px] bg-gray-900 mb-4">
                                    {currentQuestion.code}
                                </div>) : ''
                            }

                            <div className="flex gap-2">

                                {
                                    currentQuestion.attachments.map((e: attachment) => {
                                        return (
                                            <div onClick={() => downloadFile(e.path)} className="flex p-2 hover:bg-gray-100 cursor-pointer items-start gap-2 shadow rounded-md">
                                                <div className="icon">
                                                    <FileIcon className='text-gray-800' />
                                                </div>
                                                <div className="">

                                                    <p className="text-gray-800 font-medium">
                                                        {getNameFromPath(e.path)}
                                                    </p>
                                                    <p className='text-xs text-gray-500'>
                                                        (Download)
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>

                        </div>

                        <div className="mt-4 mx-auto">
                            <select onChange={
                                (e: React.ChangeEvent) => handleOnChange(e)
                            } name="qcm" id="" className='py-2 overflow-x-visible px-8 min-h-[260px] w-full' multiple>
                                {
                                    currentQuestion.answers.map((e: answer) => {
                                        return (
                                            <option value="" className='answer overflow-visible'>

                                                <label htmlFor={e.id}>

                                                    <div className="answer rounded-sm relative m-auto py-[10px] pe-4 ps-[4rem] flex justify-between">
                                                        <div className="selected absolute top-0 left-0 p-[1px] h-full"></div>
                                                        <div className="">
                                                            {e.label}
                                                        </div>
                                                        <div className="">
                                                            <input type="checkbox" className='border-0' value={e.id} name="qcm" id={e.id} />
                                                        </div>
                                                    </div>
                                                </label>
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        {
                            currentQuestion.answers.length == 0 ? (<div className="redaction-zone">
                                <textarea onChange={(e) => handleOnChange(e)} className='w-full rounded-2xl min-h-[450px] mb-2 shadow-xl p-4' placeholder='Composer ici ...' name="redaction" id=""></textarea>
                            </div>) : ''
                        }
                        <button onClick={next} className='flex hover:bg-green-700 rounded-md me-2 bg-green-500 text-white p-2 text-center justify-center ms-auto'>
                            Suivant
                            <ChevronRight />
                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Evaluation