import { QuestionType } from "../../types/forms";
import { Column } from "../../types/table";


export const question_types_columns: Column<QuestionType>[] = [
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