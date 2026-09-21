import api from "../../../api/api"
import { createSubject, deleteSubject, downloadFile, subjects } from "../../../api/question/questionApi"

export const createRubrik = async (name: {name: string}) => {
    return await createSubject(name)
}

export const deleteRubrik = async (id: number) => {
    return await deleteSubject(id)
}

export const subject = async () => {
    return await subjects()
}

export const downloadAttachment = async (path: string)=> {
    return (await downloadFile(path)).data;
}