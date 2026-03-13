import type { user } from "../../../api/auth/authApi"
import { createUser, professors, type UserForm } from "../../../api/user/userApi"

export const userService = {

    create:  (body: UserForm) => {
        return createUser(body)
    },

    trainers: () => {
        return professors()
    }
}