import { Client } from "@/src/app/types/clients";
import { FetchApi } from "./fetchApi"

export async function getClients(token: string, params = {}) {

    const options: OptionsProps = {
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

export async function createClient(token: string, data: Client) {

    const options: OptionsProps = {
        endpoint: 'clients',
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
    }

}

}