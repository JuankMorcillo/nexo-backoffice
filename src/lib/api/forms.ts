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

export async function getFormById(token: string, id: number) {

    const options: OptionsProps = {
        endpoint: `forms/${id}/withQuestions`,
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

export async function createForm(token: string, data: Form) {

    const options: OptionsProps = {
        endpoint: 'forms/formWithQuestions',
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

export async function editForm(token: string, data: Form) {

    const options: OptionsProps = {
        endpoint: `forms/${data.id}`,
        method: 'PATCH' as const,
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