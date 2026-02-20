import { Branch } from "@/src/app/types/branches";
import { FetchApi } from "./fetchApi";

export async function getBranches(token: string, params = {}) {

    const options: OptionsProps = {
        endpoint: 'branches',
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

export async function getBranchById(token: string, id: number) {

    const options: OptionsProps = {
        endpoint: `branches/${id}`,
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

export async function createBranch(token: string, data: Branch) {

    const options: OptionsProps = {
        endpoint: 'branches',
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

export async function editBranch(token: string, data: Branch) {

    const options: OptionsProps = {
        endpoint: `branches/${data.id}`,
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