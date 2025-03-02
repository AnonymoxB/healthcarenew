/* eslint-disable @typescript-eslint/no-explicit-any */
import { ID, Query } from "node-appwrite"
import {users} from "../appwrite.config"

export const createUser = async (user: CreateUserParams) => {
    try{
        const newUser = await users.create(
            ID.unique(), 
            user.email,
            user.phone,
            undefined, 
            user.name
        )
        console.log({newUser})

    } catch (error:any) {
        if(error && error?.code === 409){
            const documents = await users.list([
                Query.equal('email', [user.email])
            ])

            return documents?.users[0]
        }
    }

}