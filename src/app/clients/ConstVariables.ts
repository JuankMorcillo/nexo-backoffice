import { Column } from "../types/table";

export const columns: Column<any>[] = [
    {
        accessorKey: 'name',
        header: 'Nombre',
        size: 200,
    },
    {
        accessorKey: 'nit',
        header: 'NIT',
        size: 150,
    },
    {
        accessorKey: 'phone',
        header: 'Teléfono',
        size: 150,
    },
    {
        accessorKey: 'address',
        header: 'Dirección',
        size: 200,
    }
]