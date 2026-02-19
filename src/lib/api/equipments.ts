import { Equipment } from "@/src/app/types/equipment";
import { FetchApi } from "./fetchApi";


export async function getEquipments(token: string, params = {}) {

    const options: OptionsProps = {
        endpoint: 'equipments',
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

export async function getEquipmentById(token: string, id: number) {

    const options: OptionsProps = {
        endpoint: `equipments/${id}`,
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

export async function createEquipment(token: string, data: Equipment) {

    const options: OptionsProps = {
        endpoint: 'equipments',
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

export async function editEquipment(token: string, data: Equipment) {

    const options: OptionsProps = {
        endpoint: `equipments/${data.id}`,
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