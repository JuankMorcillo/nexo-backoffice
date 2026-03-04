import { Form } from "../types/forms";
import { Column } from "../types/table";

export const forms_columns: Column<Form>[] = [
    {
        accessorKey: 'name',
        header: 'Nombre',
        size: 200
    },
    {
        accessorKey: 'description',
        header: 'Descripción',
        size: 300
    },
    {
        accessorKey: 'ordersType.name',
        header: 'Formulario para tipo de orden',
        size: 200
    }
]
