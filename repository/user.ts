import { NuxtAxiosInstance } from "@nuxtjs/axios";
import { UserInformationToCheck } from "~/@types/users";
const prefixSingular = "user"

export default ($axios: NuxtAxiosInstance) => ({
    check(userInformationToCheck: UserInformationToCheck) {
        return $axios.$post(`/${prefixSingular}/check`, userInformationToCheck)
    },
    getMe() {
        return $axios.$get(`/${prefixSingular}/me`)
    },
    unsuscribe() {
        return $axios.$get(`/${prefixSingular}/unsuscribe`)
    },
})