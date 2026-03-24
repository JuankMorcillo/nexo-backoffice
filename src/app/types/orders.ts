export interface Order {
    id?: number;
    orders_types_id: number;
    branches_id: number;
    tasks: Task[]
}

export interface Task {
    id?: number;
    description?: string;
    equipments_id?: number;
    users_id?: number;
    start_date?: Date;
    end_date?: Date;
    status?: number;
}

export interface OrderType {
    id?: number;
    name: string;
    description?: string;
    subscribers_id?: number;
}