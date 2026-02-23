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
