import { Branch } from "../types/branches";
import { Column } from "../types/table";


export const branches_columns: Column<Branch>[] = [
    {
        accessorKey: 'name',
        header: 'Nombre',
        size: 150,
    },
    {
        accessorKey: 'address',
        header: 'Dirección',
        size: 200,
    },
    {
        accessorKey: 'phone',
        header: 'Teléfono',
        size: 150,
    },
    {
        accessorKey: 'client.name',
        header: 'Principal',
        size: 200,
    }
]