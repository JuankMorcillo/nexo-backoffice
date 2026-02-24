import { Column } from "../types/table";

export const columns: Column<any>[] = [
    {
        accessorKey: 'identification',
        header: 'Identificación',
        size: 200,
    },
    {
        accessorKey: 'name',
        header: 'Nombres',
        size: 150,
    },
    {
        accessorKey: 'lastname',
        header: 'Apellidos',
        size: 150,
    },
    {
        accessorKey: 'email',
        header: 'Correo',
        size: 200,
    },
    {
        accessorKey: 'status',
        header: 'Estado',
        size: 200,
    }
]