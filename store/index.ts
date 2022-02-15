
import { GetterTree } from 'vuex'
import { UserInformation } from '~/@types/users'

type AuthenticationType = {
    loggedIn: Boolean
    user?: UserInformation
}

export const state = () => ({
    auth: {
        loggedIn: false
    } as AuthenticationType
})

export type RootState = ReturnType<typeof state>
export const getters: GetterTree<RootState, RootState> = {
    isAuthenticated(state) {
        return state.auth.loggedIn
    },

    loggedInUser(state) {
        return state.auth.user
    },

    isSubscribed(state) {
        console.log(state.auth.user)
        return state.auth.user?.isSubscribed
    },
}
