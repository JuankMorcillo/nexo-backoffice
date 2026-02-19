import { Equipment } from "../types/equipment";
import { Column } from "../types/table";

export const equipment_columns: Column<Equipment>[] = [
    {
        accessorKey: 'serial',
        header: 'Serial',
        size: 150,
    },
    {
        accessorKey: 'brand',
        header: 'Marca',
        size: 150,
    },
    {
        accessorKey: 'model',
        header: 'Modelo',
        size: 150,
    },
    {
        accessorKey: 'description',
        header: 'Descripción',
        size: 200,
    },
]