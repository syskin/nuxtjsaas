import { Plugin } from '@nuxt/types'
import { UserInformationToCheck } from '~/@types/users'
import usersRepository from '../repository/user'

declare module 'vue/types/vue' {
    // this.$usersRepository inside Vue components
    interface Vue {
        $usersRepository: { check(userInformationToCheck: UserInformationToCheck): Promise<any>; getMe(): Promise<any>; }
    }
}

declare module '@nuxt/types' {
    // nuxtContext.app.$usersRepository inside asyncData, fetch, plugins, middleware, nuxtServerInit
    interface NuxtAppOptions {
        $usersRepository: { check(userInformationToCheck: UserInformationToCheck): Promise<any>; getMe(): Promise<any>; }
    }
    // nuxtContext.$usersRepository
    interface Context {
        $usersRepository: { check(userInformationToCheck: UserInformationToCheck): Promise<any>; getMe(): Promise<any>; }
    }
}

declare module 'vuex/types/index' {
    // this.$usersRepository inside Vuex stores
    interface Store<S> {
        $usersRepository: { check(userInformationToCheck: UserInformationToCheck): Promise<any>; getMe(): Promise<any>; }
    }
}

const repository: Plugin = (context, inject) => {
    inject('usersRepository', usersRepository(context.$axios))
}

export default repository

