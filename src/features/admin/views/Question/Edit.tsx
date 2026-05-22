import React from 'react'
import Form from './Form/Form'
import { useParams } from 'react-router-dom'

function Edit() {
    useParams()
  return (
    <Form form={} setForm={} submit={} />
  )
}

export default Edit