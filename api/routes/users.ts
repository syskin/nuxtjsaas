import { Router } from "express"
import { checkController } from "../controller/users/check";
import { deleteUserController, getUserInfoController, unsuscribeController } from "../controller/users/me";
import { checkJwt } from "../services/jwt";

const prefix = `/user`;

export default (router: Router) => {

    router.route(`${prefix}/check`).post(checkJwt, checkController)

    router.route(`${prefix}/me`)
        .get(checkJwt, getUserInfoController)
        .delete(checkJwt, deleteUserController);

    router.route(`${prefix}/unsuscribe`)
        .get(checkJwt, unsuscribeController);

    return router
}