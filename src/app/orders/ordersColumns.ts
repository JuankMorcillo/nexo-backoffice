import { Order } from "../types/orders";
import { Column } from "../types/table";

export const orders_columns: Column<Order>[] = [
    {
        accessorKey: 'order_number',
        header: 'Número de Orden',
        size: 150
    },
    {
        accessorKey: 'branch.name',
        header: 'Sucursal',
        size: 150
    },
    {
        accessorKey: 'order_type.name',
        header: 'Tipo de Orden',
        size: 150
    },
    {
        accessorKey: 'created_at',
        header: 'Fecha de Creación',
        size: 200
    }
]