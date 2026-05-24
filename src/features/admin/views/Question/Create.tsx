import React, { useState } from 'react'
import Form, { type form } from './Form/Form'
import { create } from '../../../../api/question/questionApi'
import { toFormData } from 'axios'

function Create() {
    const initialState : form = {
        question: '',
        duration: 1.6,
        score: 2,
        code: '',
        attachments: [],
        subject_id: [],
        answers: [{ id: 1, label: 'reponse 1', is_correct: true }],
        is_runnable: false
    }

    const [form, setForm] = useState<form>(initialState)

    const createRequest = async ()=> {
        try{
            const response = await create(toFormData(form))
            if(response.status == 200)
            {
                console.log(response);
            }

        }catch(error){
            console.log(error);
        }
    }
    return (
        <Form form={form} setForm={setForm} submit={createRequest} />
    )
}

export default Create