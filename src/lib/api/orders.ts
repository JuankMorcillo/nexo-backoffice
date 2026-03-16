import { Order } from "@/src/app/types/orders"
import { FetchApi } from "./fetchApi";

export async function getOrders(token: string, params = {}) {

    const options: OptionsProps = {
        endpoint: 'orders',
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

export async function getOrderById(token: string, id: number) {

    const options: OptionsProps = {
        endpoint: `orders/${id}`,
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

export async function getOrdersUser(token: string) {

    const options: OptionsProps = {
        endpoint: `orders/user`,
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

export async function createOrder(token: string, data: Order) {

    const options: OptionsProps = {
        endpoint: 'orders',
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

export async function editOrder(token: string, data: Order) {

    const options: OptionsProps = {
        endpoint: `orders/${data.id}`,
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