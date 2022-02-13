import { NuxtAxiosInstance } from "@nuxtjs/axios";
const prefixSingular = "user"
export default ($axios: NuxtAxiosInstance) => ({
    check() {
        return $axios.$post(`/${prefixSingular}/check`)
    },
    getMe() {
        return $axios.$get(`/${prefixSingular}/me`)
    },
})