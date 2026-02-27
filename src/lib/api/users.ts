import { FetchApi } from "./fetchApi"
import { User } from "@/src/app/types/users";

export async function getUsers(token: string, params = {}) {

    const options: OptionsProps = {
        endpoint: 'users',
        method: 'GET' as const,
        headers: {
            Authorization: 'bearer ' + token,
        },
        params
    }

    try {
        return await FetchApi(options);
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function getUserById(token: string, id: number) {

    const options: OptionsProps = {
        endpoint: `users/${id}`,
        method: 'GET' as const,
        headers: {
            Authorization: 'bearer ' + token,
        }
    }

    try {
        return await FetchApi(options);
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export async function createUser(token: string, data: User) {

    const options: OptionsProps = {
        endpoint: 'users',
        method: 'POST' as const,
        headers: {
            Authorization: 'bearer ' + token,
        },
        body: data
    }

    try {
        return await FetchApi(options);
    } catch (error) {
        console.log(error);
        throw error;
    }

}