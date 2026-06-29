import api from "../../../api/api"
import { createSubject, deleteSubject, subjects } from "../../../api/question/questionApi"

export const createRubrik = async (name: {name: string}) => {
    return await createSubject(name)
}

export const deleteRubrik = async (id: number) => {
    return await deleteSubject(id)
}

export const subject = async () => {
    return await subjects()
}
