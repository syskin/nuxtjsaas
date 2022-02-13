import { Request, Response, NextFunction } from "express";
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
        return next(new HttpException(500, `Une erreur est survenue`));
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
        return next(new HttpException(500, `Une erreur est survenue`));
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
        return next(new HttpException(500, `Une erreur est survenue`));
    }
};