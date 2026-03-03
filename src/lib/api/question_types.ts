import { OrderType } from "@/src/app/types/orders";
import { FetchApi } from "./fetchApi";
import { QuestionType } from "@/src/app/types/forms";

export async function getQuestionTypes(token: string, params = {}) {

    const options: OptionsProps = {
        endpoint: 'questions-types',
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

export async function getQuestionTypeById(token: string, id: number) {

    const options: OptionsProps = {
        endpoint: `questions-types/${id}`,
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

export async function createQuestionType(token: string, data: QuestionType) {

    const options: OptionsProps = {
        endpoint: 'questions-types',
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

export async function editQuestionType(token: string, data: QuestionType) {

    const options: OptionsProps = {
        endpoint: `questions-types/${data.id}`,
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