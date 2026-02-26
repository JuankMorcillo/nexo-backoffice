
export type Column<T> = {
    accessorKey: string;
    header: string;
    cell?: (value: any) => React.ReactNode;
    size?: number;
    enableSorting?: boolean;
    filterVariant?: 'select',
    filterSelectOptions?: { label: string; value: any }[],
    filterFn?: 'equals',
}

export type Actions = {
    name: string;
    icon: React.ReactNode;
    action: (value: any) => void;
}

export type TopActions = {
    name: string;
    icon?: React.ReactNode;
    action: () => void;
}

type Options = {
    bd: boolean,
    data?: any[],
}

type Meta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export type TableProps = {
    columns: Column<any>[];
    actions?: Actions[];
    options: Options;
    getInfo: (params: Params) => Promise<{ meta: Meta, data: any[] }>;
    topActions?: TopActions[];
}