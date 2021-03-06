import { Context } from "@nuxt/types";

export default function ({ app, store, redirect }: Context) {
  // If the user is not authenticated
  if (!store.state.auth) {
    return redirect('/login')
  }
}
