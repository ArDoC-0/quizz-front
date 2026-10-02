import React, { useEffect, useState } from 'react'
import './Components/scss/__evaluation.scss'
import { ChevronRight, FileIcon } from 'lucide-react'
import Timer from './Components/Timer'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/hooks'
import { decrementTime, setTime } from './globalTimerSlice'
import SingleTimer from './Components/SingleTimer'
import { decrementSingleTime, incrementCurrentIndex, setCurrentQuestion, setIndex } from './questionTimeSlice'
import { questions } from '../../shared/constants/constants'
import { setQuestionSet, type attachment, type question } from './questionsSlice'
import { Link } from 'react-router-dom'
import { getNameFromPath } from '../../shared/utils/utils'
import { downloadAttachment } from '../admin/services/questionService'
import type { answer } from '../admin/views/Question/Form/Form'
import { addNewQcmAnswer, addNewQcmAnswerFromArray, addNewRedactionAnswer, addNewRedactionAnswerFromArray, type qcm_answers, type redaction_answers, type submitAnswers } from './answersSlice'
import useNext from './Hooks/useNext'
import ProgressionBar from './Components/ProgressionBar'
import Finish from './Components/Finish'

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

    const { next } = useNext()
    const handleOnChange = (e: React.ChangeEvent) => {
        const { name, value } = e.target as HTMLInputElement
        if (name == 'qcm') {
            setQcmAnswerUnit(() => ({
                answer_ids: Array.from(e.target.selectedOptions, option => Number(option.value)),
                question_id: currentQuestion.id,
            }))
            console.log(qcmanswerUnit)

        }

        if (name == 'redaction') {
            setredactionAnswerUnit({
                question_id: currentQuestion.id,
                answer: value
            })
        }
    }

    const nextQuestion = () => {
        console.log(qcmanswerUnit)

        if (qcmanswerUnit.answer_ids.length > 0) {

            next({ questionsSet, currentIndex, answerUnit: dispatch(addNewQcmAnswer(qcmanswerUnit)) })
            setQcmAnswerUnit({
                answer_ids: [],
                question_id: 0
            })

        } else {
            if (redactionAnswerUnit.answer.length > 0) {
                next({ questionsSet, currentIndex, answerUnit: dispatch(addNewRedactionAnswer(redactionAnswerUnit)) })

                setredactionAnswerUnit({
                    answer: '',
                    question_id: 0
                })
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

    const skip = () => {
        if (currentQuestion.answers.length > 0) {

            next({
                questionsSet, currentIndex, answerUnit:
                    dispatch(addNewQcmAnswer({ answer_ids: [], question_id: currentQuestion.id }))
            })
        } else {
            next({
                questionsSet, currentIndex, answerUnit:
                    dispatch(addNewRedactionAnswer({ answer: '', question_id: currentQuestion.id }))
            })
        }

    }

    useEffect(() => {
        (async ()=>{
            await setTimeout(()=> dispatch(setQuestionSet(questions)) , 5000)
                
            const global = setInterval(() => {
                dispatch(decrementTime())
            }, 1000)
            console.log(questionsSet)
            return () => {
                clearInterval(global)
            }
    })()
    }, [dispatch])
    useEffect(() => {
        // console.log(currentQuestion)
        if (questionsSet.questions.length > 1) {

            dispatch(setCurrentQuestion({
                question: questionsSet.questions[currentIndex],
                index: currentIndex,
                seconds: questionsSet.questions[currentIndex].duration
            }))

            dispatch(setTime({ seconds: questionsSet.questions.reduce((prev: number, current) => prev + current.duration, 0) }))

            const timer = setInterval(() => {
                dispatch(decrementSingleTime())
            }, 1000)


            return () => {
                clearInterval(timer)
            }
        }
    }, [questionsSet])

    useEffect(() => {
        if (globalTime === 1) {
            let answers = {
                qcm_answers: [],
                redaction_answers: []
            }
            let finalIndex = currentIndex + 1
            for (let index = currentIndex; index + 1 < questionsSet.questions.length; index++) {
                finalIndex++
                console.log(finalIndex);

                if (questionsSet.questions[index]?.answers.length > 0) {
                    console.log(questionsSet.questions[index])
                    answers.qcm_answers = [
                        ...answers.qcm_answers,
                        {
                            question_id: questionsSet.questions[index].id,
                            answer_ids: []
                        }
                    ]

                } else {

                    answers.redaction_answers = [
                        ...answers.redaction_answers,
                        {
                            question_id: questionsSet.questions[index].id,
                            answer: ''
                        }
                    ]
                }
            }
            next({
                questionsSet, currentIndex, answerUnit:
                    dispatch(addNewQcmAnswerFromArray(answers.qcm_answers))
            })
            next({
                questionsSet, currentIndex, answerUnit:
                    dispatch(addNewRedactionAnswerFromArray(answers.redaction_answers))
            })
            dispatch(setIndex(finalIndex))

        }
    }, [globalTime])
    return currentIndex + 1 > questionsSet.questions.length ? <Finish /> : (
        <div className='bg-white h-dvh items-center'>
            <div className=" py-4">
                <div className='flex items-center justify-between gap-4 py-2 w-[60%] mx-auto'>

                    {questionsSet.questions.length > 1 ? (<ProgressionBar total={questionsSet.questions.length} current={currentIndex + 1} />) : ''}
                    <Timer remainingTime={globalTime} />
                </div>
                <div className="body-section m-auto min-h-[600px] w-full px-4 bg-gray-50">
                    <div className="w-[60vw] mx-auto">

                        <div className="py-4 question">
                            <p className="text-center text-gray-700 text-md font-semibold mb-1">{`Question ${currentIndex + 1}`}</p>
                            <p className="text-gray-900  font-bold text-xl mb-4 text-center">
                                <SingleTimer remainingTime={singleTime} />
                            </p>

                            <p className="text-gray-900 mb-4 font-medium shadow-gray-400 shadow-">
                                {currentQuestion.question}
                            </p>
                            {
                                currentQuestion.code ? (<div className="h-[250px] text-white p-2 bg-gray-900 mb-4">
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
                            {currentQuestion.answers.length > 0 ? (<select onChange={
                                (e: React.ChangeEvent) => handleOnChange(e)
                            } name="qcm" id="" className='py-2 overflow-x-visible px-8 min-h-[260px] w-full' multiple>
                                {
                                    currentQuestion.answers.map((e: answer) => {
                                        return (
                                            <option value={e.id} className='answer overflow-visible'>

                                                <div className="answer rounded-sm relative m-auto py-[10px] pe-4 ps-[4rem] flex justify-between">
                                                    <div className="selected absolute top-0 left-0 p-[1px] h-full"></div>
                                                    <div className="">
                                                        {e.label}
                                                    </div>
                                                </div>

                                            </option>
                                        )
                                    })
                                }
                            </select>) : (<div className="redaction-zone">
                                <textarea onChange={(e) => handleOnChange(e)} className='w-full rounded-2xl min-h-[450px] mb-2 shadow-xl p-4' placeholder='Composer ici ...' name="redaction" id=""></textarea>
                            </div>)}
                        </div>
                        <div className="flex justify-end gap-2">
                            <button onClick={skip} className='flex w-25 hover:bg-gray-100 rounded-md me-2 shadow shadow-gray-400 text-gray-500 p-2 text-center justify-center '>
                                Passer
                            </button>
                            <button onClick={nextQuestion} className='flex hover:bg-green-700 rounded-md me-2 bg-green-500 text-white p-2 text-center justify-center '>
                                Suivant
                                <ChevronRight />
                            </button>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Evaluation