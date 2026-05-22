import React, { useState, type ChangeEvent, type Dispatch } from 'react'
import './form.scss'

export interface form {
    subject: string
    duration: number | string
    note: number | string
    attachments?: FileList | []
    subject_id?: number[]
    code: string
    answers?: answer[]
    is_runnable: boolean
}
export interface answer {
    id: number
    label: string
    is_correct: boolean
}

function Form({form, setForm, submit }: {form: form, setForm: React.Dispatch<React.SetStateAction<form>>, submit: () => void}) {

    const [questionType, setQuestionType] = useState<'qcm' | 'redaction'>('qcm')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLInputElement | HTMLSelectElement, Element>) => {
        const { name, value, files } = e.target as HTMLInputElement;
        if (name === "attachments" && files) {
            setForm((prev) => ({ ...prev, attachments: files }))
            console.log(form);

        } else {
            if (name === 'subject_id') {
                setForm(prev => ({
                    ...prev,
                    subject_id: Array.from(e.target.selectedOptions, option => option.value)
                }));
            } else {
                if (name === 'is_runnable') {
                    setForm(prev => ({
                        ...prev,
                        is_runnable: !form.is_runnable
                    }))
                } else {
                    if (name === 'question_type') {
                        setQuestionType(value);
                    } else {
                        setForm(prev => ({ ...prev, [name]: value }));
                    }
                }
            }
        }

    };

    const addAnswer = () => {
        setForm({
            ...form,
            answers: [
                ...form.answers,
                {
                    id: form.answers?.length + 1, label: '', is_correct: false
                }
            ]
        })
    }

    const updateAnswer = (id: number, e: ChangeEvent<HTMLInputElement>) => {
        const ans = form.answers
        ans.find(e => e.id == id).label = e.target.value
        setForm({
            ...form,
            answers: ans
        })
    }

    const updateTruth = (id: number) => {
        const ans = form.answers.map((e) => { e.is_correct = e.id == id; return e }
            // ans.find(e=> e.id == id).is_correct = !ans.find(e=> e.id == id)?.is_correct
        )
        setForm({
            ...form,
            answers: ans
        })
    }

    console.log(form, questionType);

    return (
        <div className=" grid grid-cols-3 gap-2">

            <div className="bg-white col-span-2 px-8 py-6 rounded-3xl">
                <h3 className="text ps-4">Créer/Modifer une question</h3>
                <form onSubmit={(e) => e.preventDefault()} className="p-4">

                    <div className="editor mb-4 border border-gray-300 rounded-3xl w-full">

                    </div>


                    <div className="inputs flex flex-wrap gap-2 justify-between">
                        <div className="border-gray-500 mb-4 border-b flex-1">
                            <label htmlFor="photo" className="text-gray-600 text-sm font-medium mb-1">
                                Durée
                            </label>
                            <input type="number" name="duration" onChange={handleChange} className='w-full' placeholder='1.5 minutes' id="" />
                        </div>
                        <div className="border-gray-500 mb-4 border-b flex-1">
                            <label htmlFor="photo" className="text-gray-600 text-sm font-medium mb-1">
                                Note
                            </label>
                            <input type="number" name="note" onChange={handleChange} className='w-full' placeholder='2 points' id="" />
                        </div>
                        <select multiple name="subject_id" onChange={handleChange} className='subjects b-gray-300 mb-4 text-[1rem] py-1 px-2 rounded-xl ' id="">
                            <option disabled className='disabled'>
                                Choisir le sujet
                            </option>
                            <option value="1">
                                PHP
                            </option>
                            <option value="2">
                                PDO
                            </option>
                        </select>

                        <div className="mb-4 w-full">
                            <label htmlFor="photo" className="text-gray-600 text-sm font-medium">
                                Ajouter du code
                            </label>
                            <textarea name="code" onChange={(e) => handleChange(e)} className='editor rounded-2xl shadow-lg w-full mt-2 p-4 h-56' placeholder='Coller ici...' id=""></textarea>
                        </div>

                        {/* attachments */}
                        <div className="flex flex-col w-full mb-4">
                            <label htmlFor="photo" className="text-gray-600 text-sm font-medium mb-1">
                                Photo
                            </label>
                            <input
                                type="file"
                                name="attachments"
                                id="attachments"
                                accept="image/*"
                                className="
                                    p-2 
                                    text-gray-700 
                                    bg-white 
                                    border border-gray-300 
                                    rounded-lg 
                                    shadow-sm 
                                    focus:outline-none 
                                    focus:ring-2 focus:ring-blue-400 
                                    focus:border-blue-500 
                                    transition-all
                                    "
                                onChange={handleChange}
                                multiple
                            />
                            {/* {preview && (
                                <img
                                    src={preview}
                                    alt="Aperçu"
                                    className="mt-2 w-28 h-28 object-cover rounded-full border border-gray-300 shadow-sm"
                                />
                            )} */}
                        </div>

                    </div>
                    <div className="flex items- gap-6 mb-4">
                        <div className="flex items-center">
                            <select
                                name="question_type"
                                onChange={handleChange}
                                className='mb-auto mt-auto bg-blue-900 text-[1rem] py-1 px-2 rounded-xl text-white' id=""
                            >
                                <option value="qcm">
                                    Qcm
                                </option>
                                <option value="redaction">
                                    Redaction
                                </option>
                            </select>
                        </div>
                        {
                            questionType === 'redaction' &&
                            <div className='flex items-start gap-1'>
                                <input
                                    className='mb-auto mt-auto' id='exec'
                                    checked={form.is_runnable}
                                    value={String(form.is_runnable)}
                                    onChange={handleChange}
                                    name='is_runnable'
                                    type="checkbox"
                                />
                                <label className='mb-auto mt-auto text' htmlFor="exec">Exécutable</label>
                            </div>
                        }
                    </div>

                    {
                        questionType === 'qcm' &&
                        <div className="">
                            <div>
                                <h3 className='text-gray-600 text-sm font-medium mb-2'>Réponses</h3>
                                <div className="flex justify-between gap-2 flex-wrap">

                                    {form.answers?.map((e: answer) => (
                                        <div className="flex items-center mb-4">
                                            <div className="flex border-gray-500 border-b">
                                                <input
                                                    type="text"
                                                    name='answer'
                                                    value={e.label}
                                                    onChange={(ev) => updateAnswer(e.id, ev)}
                                                    placeholder='Réponse' />
                                            </div>
                                            <div className="flex flex-col">
                                                <label >
                                                    <input type="radio"
                                                        name="is_correct"
                                                        checked={e.is_correct}
                                                        name="is_correct"
                                                        onChange={() => updateTruth(e.id)} id="" className='hidden peer accent-green-400' />
                                                    <div className="rounded-full w-4 h-4 border-red-400 border-2 peer-checked:bg-green-500
                                        peer-checked:border-green-200">

                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    ))

                                    }
                                </div>

                                {/* <BooleanInput name='type' fn={()=>0} /> */}
                                <div className="flex py-2">
                                    <button onClick={addAnswer} className=' bg-green-600 w-4 text-center text-white  hover:bg-green-500'>
                                        <span>
                                            +
                                        </span>
                                    </button>

                                </div>

                            </div>

                        </div>
                    }
                    {/* Bouton */}
                    <div className="flex mt-4 justify-center items-center">

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all shadow-md shadow-blue-300/20"
                        >
                            Créer la question
                        </button>
                    </div>

                </form>
            </div>

            <div className="rounded-3xl bg-white">

            </div>
        </div>

    )
}

export default Form