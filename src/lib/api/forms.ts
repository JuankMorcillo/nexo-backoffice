import { Form } from "@/src/app/types/forms";
import { FetchApi } from "./fetchApi";


export async function getForms(token: string, params = {}) {

    const options: OptionsProps = {
        endpoint: 'forms',
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

export async function createForm(token: string, data: Form) {

    const options: OptionsProps = {
        endpoint: 'forms',
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