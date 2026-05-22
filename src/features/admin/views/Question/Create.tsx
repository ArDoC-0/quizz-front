import React, { useState } from 'react'
import Form, { type form } from './Form/Form'

function Create() {
    const [form, setForm] = useState<form>({
        subject: '',
        duration: 1.6,
        note: 2,
        code: '',
        attachments: [],
        subject_id: [],
        answers: [{ id: 1, label: 'ss', is_correct: true }],
        is_runnable: false
    })

    const createRequest = ()=> {

    }
    return (
        <Form form={form} setForm={setForm} submit={createRequest} />
    )
}

export default Create