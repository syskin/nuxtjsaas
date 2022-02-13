import { Filters } from "~/@types/firebase";
import { UserInformation } from "~/@types/users";
import { addUser, getOneUserById, getUsers, updateOneUserById } from "../repository/users/requests"

/**
 * 
 * @param userInformation 
 * @returns 
 */
export const add = async (userInformation: UserInformation) => {
    try {
        if (!userInformation) throw new Error(`User information missing`);
        userInformation.lastModified = Date.now();
        userInformation.created = Date.now();

        const user = await addUser(userInformation);

        if (!user) throw new Error(`User not created`);

        return user;
    } catch (error: unknown) {
        throw new Error(error as string);
    }
};

/**
 * 
 * @param id 
 * @returns 
 */
export const getById = async (id: string) => {
    try {
        if (!id) throw new Error(`User id missing`);

        const user = await getOneUserById(id);

        if (!user) throw new Error(`User doesn't exist`);

        return user;
    } catch (error: unknown) {
        throw new Error(error as string);
    }
};

/**
 * 
 * @param id 
 * @param userInformation 
 * @returns 
 */
export const updateById = async (id: string, userInformation: UserInformation) => {
    try {
        if (!id) throw new Error(`User id missing`);
        if (!userInformation) throw new Error(`User information missing`);

        const user = await updateOneUserById(id, userInformation);

        return user;
    } catch (error: unknown) {
        throw new Error(error as string);
    }
};

/**
 * 
 * @param filters 
 * @returns 
 */
export const get = async (filters: Filters) => {
    try {
        const users = await getUsers(filters)

        return users
    } catch (error: unknown) {
        throw new Error(error as string);
    }
}