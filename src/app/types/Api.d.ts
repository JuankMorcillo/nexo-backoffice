import { Params } from "./params"

declare global {
    type OptionsProps = {
        endpoint: string,
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
        data?: any,
        body?: any,
        headers?: any,
        params?: any
    }
    type FetchPayload = {
        token: string,
        params: Params
    }
}

export { }