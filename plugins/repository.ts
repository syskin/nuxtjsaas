import { Plugin } from '@nuxt/types'
import usersRepository from '../repository/user'

declare module 'vue/types/vue' {
    // this.$usersRepository inside Vue components
    interface Vue {
        $usersRepository: { check(): Promise<any>; getMe(): Promise<any>; }
    }
}

declare module '@nuxt/types' {
    // nuxtContext.app.$usersRepository inside asyncData, fetch, plugins, middleware, nuxtServerInit
    interface NuxtAppOptions {
        $usersRepository: { check(): Promise<any>; getMe(): Promise<any>; }
    }
    // nuxtContext.$usersRepository
    interface Context {
        $usersRepository: { check(): Promise<any>; getMe(): Promise<any>; }
    }
}

declare module 'vuex/types/index' {
    // this.$myInjectedFunction inside Vuex stores
    interface Store<S> {
        $usersRepository: { check(): Promise<any>; getMe(): Promise<any>; }
    }
}

const repository: Plugin = (context, inject) => {
    inject('usersRepository', usersRepository(context.$axios))
}

export default repository

