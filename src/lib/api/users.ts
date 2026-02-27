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

    const formData = new FormData();
    for (const key in data) {
        if (data[key as keyof User] !== undefined) {
            if (Array.isArray(data[key as keyof User])) { 
                formData.append(key, JSON.stringify(data[key as keyof User]));
            } else {
                formData.append(key, String(data[key as keyof User]));
            }
        }
    }

    const options: OptionsProps = {
        endpoint: 'users',
        method: 'POST' as const,
        headers: {
            Authorization: 'bearer ' + token,
        },
        body: formData
    }
    
    try {
        return await FetchApi(options);
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export async function editUser(token: string, data: User) {
    const formData = new FormData();
    for (const key in data) {
        if (data[key as keyof User] !== undefined) {
            if (Array.isArray(data[key as keyof User])) { 
                formData.append(key, JSON.stringify(data[key as keyof User]));
            } else {
                formData.append(key, String(data[key as keyof User]));
            }
        }
    }
    const options: OptionsProps = {
        endpoint: `users/${data.id}`,
        method: 'PATCH' as const,
        headers: {
            Authorization: 'bearer ' + token,
        },
        body: formData
    }

    try {
        return await FetchApi(options);
    } catch (error) {
        console.log(error);
        throw error;
    }

}