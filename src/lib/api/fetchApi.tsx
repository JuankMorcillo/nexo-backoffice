import axios from "axios";
import { API_BASE_URL } from '@/src/lib/api/config'

type Props = {
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: any,
    body?: any,
    headers?: any,
    params?: any
}

let status: number = 200;

export async function FetchApi(options: Props) {
    const { endpoint, method, data, body, headers, params } = options;

    const url = `${API_BASE_URL}/${endpoint}`;

    try {

        return await axios(url, {
            method,
            data: body || data,
            headers,
            params
        }).then(response => {
            status = response.status;
            return response.data;
        }).catch(error => {
            status = error.response ? error.response.status : 500;
            console.error("FetchApi Error:", error.response ? error.response.data : error.message);
            throw error;
        })

    } catch (error) {
        console.error("FetchApi Exception:", error);
        throw error;
    }

}