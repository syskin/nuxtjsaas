import { Request, Response, NextFunction } from "express";
import { add, get, getById, updateById } from "../../services/user";
import HttpException from "../../exceptions/HttpException";
type LoginProperties = {
    sub: string
    email: string
}

export const checkController = async (req: Request<LoginProperties>, res: Response, next: NextFunction) => {
    try {

        const { email, sub } = req?.body;
        console.log(`Check user `, req.auth?.payload)
        /*
        const createdUserId = await add({
            email,
            password,
        })

        await updateById(createdUserId, { email, password: '321' });

        const user = await getById(createdUserId)

        const users = await get([{
            key: 'created',
            operator: '==',
            value: 1644149893211
        },
        {
            key: 'password',
            operator: '==',
            value: '123'
        }])
        */
        return res.status(200).json({
            status: `success`,
            statusCode: 200,
        });
    } catch (e) {
        console.log(e)
        return next(new HttpException(500, `Une erreur est survenue`));
    }
};
