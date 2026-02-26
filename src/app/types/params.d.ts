
declare global {
    type Params = {
        page: number;
        limit: number;
        search: string;
        order: string;
        orderBy?: number | string;
        [key: string]: any;
    }
}

export { }
