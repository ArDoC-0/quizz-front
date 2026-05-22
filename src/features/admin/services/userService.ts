import type { user } from "../../../api/auth/authApi"
import { createUser, professors, type CreateUserForm, type UserForm } from "../../../api/user/userApi"

export const userService = {

    create:  (body: CreateUserForm) => {
        return createUser(body)
    },

    trainers: () => {
        return professors()
    }
}