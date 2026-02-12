import { Params } from "./params";

export interface FetchClientsPayload {
    token: string;
    params: Params;
}

export interface Client {
    id?: number;
    token?: string;
    subscribers_id?: number;
    name: string;
    nit: string;
    address: string;
    phone: string;
}