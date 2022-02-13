import { Request, Response, NextFunction } from "express";
import { add, get } from "../../services/user";
import HttpException from "../../exceptions/HttpException";
import { CheckProperties } from "../../../@types/users";

export const checkController = async (req: Request<CheckProperties>, res: Response, next: NextFunction) => {
    try {

        const { email, sub } = req?.body;

        const user = await get([{
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

        if (!user?.[0]) {
            console.log(`Create a new user in Firebase DB`)
            await add({
                email,
                sub,
            })
        } else {
            console.log(`Update existing user in Firebase DB`)
        }

        // We can return users right to use other functionnality and complete user payload for frontend

        return res.status(200).json({
            status: `success`,
            statusCode: 200,
        });
    } catch (e) {
        console.log(e)
        return next(new HttpException(500, `Une erreur est survenue`));
    }
};
