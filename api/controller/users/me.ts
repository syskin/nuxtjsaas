import { Request, Response, NextFunction } from "express";
import Stripe from "stripe";
import { UserInformation } from "~/@types/users";
import { get, updateById } from "../../services/user";
import HttpException from "../../exceptions/HttpException";

export const getUserInfoController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(`You get me`)
        return res.status(200).json({
            status: `success`,
            statusCode: 200
        });
    } catch (e) {
        console.log(e)
        return next(new HttpException(500, `Something went wrong`));
    }
};

export const updateUserInfoController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json({
            status: `success`,
            statusCode: 200
        });
    } catch (e) {
        console.log(e)
        return next(new HttpException(500, `Something went wrong`));
    }
};

export const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return res.status(200).json({
            status: `success`,
            statusCode: 200
        });
    } catch (e) {
        console.log(e)
        return next(new HttpException(500, `Something went wrong`));
    }
};

export const unsuscribeController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(`unsuscribeController`)

        const sub: string = req.auth?.payload?.sub || ''
        if (!sub) return new HttpException(400, `Something went wrong`)

        const user = await get([{
            key: 'sub',
            operator: '==',
            value: sub
        },
        ]) as UserInformation[]

        if (!user?.[0]) return new HttpException(404, `No existing user`)
        else {
            console.log(`Call stripe`, user[0].subscription)
            const subscribtionId = user[0].subscription

            if (!subscribtionId) return new HttpException(400, `Something went wrong`)

            const userId = await get([{
                key: 'subscription',
                operator: '==',
                value: subscribtionId
            },
            ], true) as string[]


            if (!userId[0]) return new HttpException(404, `No existing subscribtion`)

            const stripe = new Stripe(process.env.STRIPE_SK || '', {
                apiVersion: '2020-08-27',
            })
            stripe.subscriptions.del(subscribtionId);

            await updateById(userId[0], {
                period: { end: 0, start: 0 },
                status: 'cancelled'
            })

        }

        return res.status(200).json({
            status: `success`,
            statusCode: 200,
            user: {
                isSubscribed: false
            }
        });
    } catch (e) {
        console.log(e)
        return next(new HttpException(500, `Something went wrong`));
    }
}; 