import { Router } from "express"
import { webhookController } from "../controller/stripe/webhook";

const prefix = `/stripe`;

export default (router: Router) => {

    router.route(`${prefix}/webhook`).post(webhookController)

    return router
}