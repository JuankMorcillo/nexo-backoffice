import { OrderType } from "../../types/orders";
import { Column } from "../../types/table";


export const order_types_columns: Column<OrderType>[] = [
    {
        accessorKey: 'name',
        header: 'Nombre',
        size: 150,
    },
    {
        accessorKey: 'description',
        header: 'Descripción',
        size: 200,
    },
]