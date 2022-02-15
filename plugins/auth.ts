import { Context, Plugin } from '@nuxt/types'


export default async function (context: Context): Promise<Plugin | undefined> {
    if (!context.app.$auth.loggedIn) {
        return undefined
    }
    const auth = context?.app.$auth
    const authStrategy = auth.strategy.name
    if (authStrategy === 'auth0') {
        const { sub, email } = context.app.$auth.user
        const checkedUser = await context.$usersRepository.check({ sub, email })
        context.app.$auth.setUser({ ...context.app.$auth.user, ...checkedUser.user })
        console.log('Im auth0 authent')
    } else {
        console.log('Im not auth0 authent')
    }
}
