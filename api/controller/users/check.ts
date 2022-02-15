import { Request, Response, NextFunction } from "express";
import { add, get } from "../../services/user";
import HttpException from "../../exceptions/HttpException";
import { CheckProperties, UserInformation } from "../../../@types/users";

export const checkController = async (req: Request<CheckProperties>, res: Response, next: NextFunction) => {
    try {

        const { email, sub } = req?.body;

        const checkUser = await get([{
            key: 'sub',
            operator: '==',
            value: sub
        },
        {
            key: 'email',
            operator: '==',
            value: email
        }
        ])

        let user = {}
        if (!checkUser?.[0]) {
            console.log(`Create a new user in Firebase DB`)
            user = await add({
                email,
                sub,
            })
        } else {
            console.log(`Update existing user in Firebase DB`)
            user = checkUser[0]
        }

        return res.status(200).json({
            status: `success`,
            statusCode: 200,
            user: {
                isSubscribed: isSubscribed(user as UserInformation)
            }
        });
    } catch (e) {
        console.log(e)
        return next(new HttpException(500, `Something went wrong`));
    }
};

const isSubscribed = (user: UserInformation) => {
    const currentTimestamp = Math.round(Date.now() / 1000)
    const hasSubscribed = !!(user.sub)
    const hasPaid = user.status === 'paid'
    const isValidPeriod = user?.period && user?.period?.end > currentTimestamp && currentTimestamp > user?.period?.start

    return hasSubscribed && hasPaid && isValidPeriod
}