import 'firebase/firestore';
import { UserInformation } from '~/@types/users'
import { db } from '../../index';
import { DocumentData } from 'firebase/firestore';
import { firestore } from 'firebase-admin';
import { Filters } from '~/@types/firebase';

/**
 * @param userInformation 
 * @returns string
 */
export const addUser = async (userInformation: UserInformation): Promise<string> => {
    const { id } = await db.collection('users').add(userInformation);
    return id;
}

/**
 * @param userInformation 
 * @returns string
 */
export const deleteUser = async (userId: string): Promise<firestore.WriteResult> => {
    const res = await db.collection('users').doc(userId).delete()
    return res;
}

/**
 * 
 * @param userId 
 * @returns UserInformation | undefined
 */
export const getOneUserById = async (userId: string): Promise<DocumentData | undefined> => {
    const user = await db.collection('users').where(firestore.FieldPath.documentId(), '==', userId).get()
    return user.docs.map(user => user.data())[0] as UserInformation | undefined
}

/**
 * 
 * @param userId 
 * @param userInformation 
 * @returns 
 */
export const updateOneUserById = async (userId: string, userInformation: UserInformation): Promise<DocumentData | undefined> => {
    const userToUpdate = await db.collection('users').doc(userId)
    const res = await userToUpdate.update(userInformation)
    return res
}

/**
 * 
 * @param filters 
 * @returns UserInformation[]
 */
export const getUsers = async (filters: Filters, id = false) => {
    let query = db.collection('users') as firestore.Query<firestore.DocumentData>
    filters.map(filter => {
        query = query.where(filter.key, filter.operator, filter.value)
    })
    const users = await query.get()

    if (id) return users.docs.map(user => user.id) as string[]
    return users.docs.map(user => user.data()) as UserInformation[]
}