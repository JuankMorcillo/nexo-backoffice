import { FetchApi } from "./fetchApi"

export async function getClients(token: string, params = {}) {

    const options = {
        endpoint: 'clients',
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
    }
}