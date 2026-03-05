import { Permission } from "../types/permissions";
import { Column } from "../types/table";

export const permission_columns: Column<Permission>[] = [
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