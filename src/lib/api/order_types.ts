import { OrderType } from "@/src/app/types/orders";
import { FetchApi } from "./fetchApi";

export async function getOrderTypes(token: string, params = {}) {

    const options: OptionsProps = {
        endpoint: 'orders-types',
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

export async function getOrderTypeById(token: string, id: number) {

    const options: OptionsProps = {
        endpoint: `orders-types/${id}`,
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

export async function createOrderType(token: string, data: OrderType) {

    const options: OptionsProps = {
        endpoint: 'orders-types',
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

export async function editOrderType(token: string, data: OrderType) {

    const options: OptionsProps = {
        endpoint: `orders-types/${data.id}`,
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