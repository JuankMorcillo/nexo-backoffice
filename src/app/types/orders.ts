export interface Order {
    id?: number;
    orders_types_id: number;
    branches_id: number;
    tasks: Task[]
}

export interface Task {    
    description: string;    
    equipments_id: number;
    users_id: number;
}

export interface OrderType {
    id: number;
    name: string;
    description?: string;
}