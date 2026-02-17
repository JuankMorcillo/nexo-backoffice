import axios from "axios";
import { API_BASE_URL } from '@/src/lib/api/config'

let status: number = 200;

export async function FetchApi(options: OptionsProps) {
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

            let message = ''

            if (error.response.data?.message instanceof Array) {
                message = error.response.data.message.join(', ');
                throw message
            }
            throw error.response.data?.message;
        })

    } catch (error) {
        console.error("FetchApi Exception:", error);
        throw error;
    }

}