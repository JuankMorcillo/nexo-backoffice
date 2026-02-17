'use client';

import { useEffect, useState } from "react";
import { TableProps } from "../types/table";
import {
    MaterialReactTable,
    MRT_ColumnFiltersState,
    MRT_SortingState,
    useMaterialReactTable,
} from 'material-react-table';
import { darken, lighten, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useSession } from "next-auth/react";
import { Params } from "../types/params";
import { tableConstants } from "@/src/hooks/table_constants";
import { useSelector } from "react-redux";
import { selectReload, triggerReload } from "../store/slices/reloadSlice";


export default function MyTable({ columns, actions, topActions, getInfo, options }: TableProps) {

    const { data: status } = useSession();
    const reload = useSelector(selectReload)
    const [data, setData] = useState<any>([])
    const { BASEBACKGROUNDCOLOR, SHADES, TABLETHEME } = tableConstants();
    const [columnFilters, setColumnFilter] = useState<MRT_ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(
        options.bd ? 0 : options && options.data ? options.data.length : 0
    );
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const table = useMaterialReactTable({
        columns: columns,
        data: options.bd ? data : options.data || [],
        manualFiltering: options.bd,
        manualPagination: options.bd,
        manualSorting: options.bd,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilter,
        onSortingChange: setSorting,
        // enableRowNumbers: true,
        // rowNumberDisplayMode: 'static',  
        defaultColumn: {
            minSize: 40,
            maxSize: 200,
            size: 40,
        },
        state: options.bd ? {
            columnFilters,
            globalFilter,
            isLoading,
            pagination,
            showProgressBars: isRefetching,
            sorting,
        } : {
            pagination,
            columnFilters,
            globalFilter,
        },
        rowCount: rowCount,
        onPaginationChange: setPagination,
        muiPaginationProps: {
            color: 'primary',
            shape: 'rounded',
            variant: 'outlined',
        },
        paginationDisplayMode: 'pages',
        muiTableBodyProps: {
            sx: (theme) => ({
                '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td':
                {
                    backgroundColor: darken(BASEBACKGROUNDCOLOR, 0.1),
                },
                '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]):hover > td':
                {
                    backgroundColor: darken(BASEBACKGROUNDCOLOR, 0.2),
                },
                '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]) > td':
                {
                    backgroundColor: lighten(BASEBACKGROUNDCOLOR, 0.1),
                },
            }),
        },
        muiTableHeadCellProps: {
            sx: {
                color: 'black',
            }
        },
        muiTableBodyCellProps: {
            sx: {
                color: 'black',
            }
        },
        muiTableHeadProps: {
            sx: {
                "& .MuiSvgIcon-root, .MuiButtonBase-root, .MuiSvgIcon-root, .MuiTableSortLabel-root .MuiTableSortLabel-icon": {
                    fontStyle: {
                        color: 'black !important',
                        opacity: 1
                    },

                },
            }
        },
        muiBottomToolbarProps: {
            sx: {
                color: 'black',
                "& .MuiSvgIcon-root, .MuiButtonBase-root, .MuiSvgIcon-root, .MuiTableSortLabel-root": {
                    fontStyle: {
                        color: 'black !important',
                        opacity: 1
                    },
                },
                ".css-uqq6zz-MuiFormLabel-root-MuiInputLabel-root": {
                    color: 'black !important',
                },
                ".css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input.css-1rxz5jq-MuiSelect-select-MuiInputBase-input-MuiInput-input": {
                    color: 'black !important',
                }

            }
        },
        muiTopToolbarProps: {
            sx: {
                "& .MuiSvgIcon-root, .MuiButtonBase-root, .MuiSvgIcon-root, .MuiTableSortLabel-root": {
                    fontStyle: {
                        color: 'black !important',
                        opacity: 1
                    },
                },
                ".css-12yjm75-MuiInputBase-input-MuiOutlinedInput-input": {
                    color: 'black !important',
                },
                ".css-1v8abvc-MuiInputBase-root-MuiOutlinedInput-root": {
                    color: 'black !important',
                }
            }
        },
        muiFilterTextFieldProps: {
            sx: {
                color: 'black !important',
                ".css-929hxt-MuiInputBase-input-MuiInput-input": {
                    color: 'black !important',
                },
            }
        },
        mrtTheme: (theme) => ({
            baseBackgroundColor: 'rgb(255, 255, 255)',
        }),
        localization: {
            actions: 'actions',
            and: 'y',
            cancel: 'Cancelar',
            changeFilterMode: 'Cambiar modo de filtro',
            changeSearchMode: 'Cambiar modo de búsqueda',
            clearFilter: 'Borrar filtro',
            clearSearch: 'Borrar búsqueda',
            clearSelection: 'Borrar selección',
            clearSort: 'Borrar ordenamiento',
            clickToCopy: 'Haga click para copiar',
            copy: 'Copiar',
            collapse: 'Colapsar',
            collapseAll: 'Colapsar todo',
            columnActions: 'Columna de actions',
            copiedToClipboard: 'Copiado al portapapeles',
            dropToGroupBy: 'Soltar para agrupar por {column}',
            edit: 'Editar',
            expand: 'Expandir',
            expandAll: 'Expandir todo',
            filterArrIncludes: 'Incluye',
            filterArrIncludesAll: 'Incluye todos',
            filterArrIncludesSome: 'Incluye algunos',
            filterBetween: 'Entre',
            filterBetweenInclusive: 'Entre (inclusivo)',
            filterByColumn: 'Filtrar por {column}',
            filterContains: 'Contiene',
            filterEmpty: 'Vacio',
            filterEndsWith: 'Termina con',
            filterEquals: 'Iguales',
            filterEqualsString: 'Iguales',
            filterFuzzy: 'Difuso',
            filterGreaterThan: 'Mas grande que',
            filterGreaterThanOrEqualTo: 'Mas grande que o igual a',
            filterInNumberRange: 'Entre',
            filterIncludesString: 'Contiene',
            filterIncludesStringSensitive: 'Contiene',
            filterLessThan: 'Menos que',
            filterLessThanOrEqualTo: 'Menos que o igual a',
            filterMode: 'Modo de filtro: {filterType}',
            filterNotEmpty: 'No vacio',
            filterNotEquals: 'No iguales',
            filterStartsWith: 'Empieza con',
            filterWeakEquals: 'Iguales',
            filteringByColumn: 'Filtrando por {column} - {filterType} - {filterValue}',
            goToFirstPage: 'Ir a la primera página',
            goToLastPage: 'Ir a la última página',
            goToNextPage: 'Ir a la página siguiente',
            goToPreviousPage: 'Regresar a la pagina anterior',
            grab: 'Agarrar',
            groupByColumn: 'Agrupar por {column}',
            groupedBy: 'Agrupado por',
            hideAll: 'Ocultar todo',
            hideColumn: 'Ocultar {column}',
            max: 'Máximo',
            min: 'Mínimo',
            move: 'Mover',
            noRecordsToDisplay: 'No hay registros para mostrar',
            noResultsFound: 'No se encontraron resultados',
            of: 'de',
            or: 'o',
            pin: 'Anclar',
            pinToLeft: 'Anclar a la izquierda',
            pinToRight: 'Anclar a la derecha',
            resetColumnSize: 'Resetear tamaño de columna',
            resetOrder: 'Resetar orden',
            rowActions: 'actions de fila',
            rowNumber: '#',
            rowNumbers: 'Números de fila',
            rowsPerPage: 'Filas por página',
            save: 'Guardar',
            search: 'Buscar',
            select: 'Seleccionar',
            selectedCountOfRowCountRowsSelected:
                '{selectedCount} de {rowCount} fila(s) seleccionada(s)',
            showAll: 'Mostrar todo',
            showAllColumns: 'Mostrar todas las columnas',
            showHideColumns: 'Mostrar/ocultar columnas',
            showHideFilters: 'Mostrar/ocultar filtros',
            showHideSearch: 'Mostrar/ocultar búsqueda',
            sortByColumnAsc: 'Ordenar por {column} ascendente',
            sortByColumnDesc: 'Ordenar por {column} descendente',
            sortedByColumnAsc: 'Ordenar por {column} ascendente',
            sortedByColumnDesc: 'Ordenar por {column} descendente',
            thenBy: ', despues por ',
            toggleDensity: 'Alternar densidad',
            toggleFullScreen: 'Alternar pantalla completa',
            toggleSelectAll: 'Alternar seleccionar todo',
            toggleSelectRow: 'Alternar seleccionar fila',
            toggleVisibility: 'Alternar visibilidad',
            ungroupByColumn: 'Desagrupar por {column}',
            unpin: 'Desanclar',
            unpinAll: 'Desanclar todo',
        },
        enableFullScreenToggle: false,
        enableDensityToggle: false,
        enableRowActions: actions ? true : false,
        enableTopToolbar: topActions ? true : false,
        positionActionsColumn: 'last',
        displayColumnDefOptions: actions ? {
            'mrt-row-actions': {
                header: '', //change header text
                size: 40, //make actions column wider        
            },
        } : undefined,
        renderRowActions: ({ row, table }) => (
            <div style={{
                display: 'flex',
                gap: '10px',
            }}>
                {
                    actions?.map((action, index) => {
                        return <div key={index}>
                            <button
                                className="text-black cursor-pointer"
                                key={index}
                                type='button'
                                style={{
                                    cursor: (row.original.status == 0 && action.name == 'eliminar')
                                        || (row.original.status == 1 && action.name == 'activar')
                                        ? 'auto'
                                        : 'pointer',
                                }}
                                // disabled={((row.original.estado == 'A FACTURAR' || row.original.estado == 'CANCELADA') && accion.name == 'Editar')}
                                onClick={(e) => {
                                    action.action(row.original)
                                }}>
                                {action.icon}
                            </button>
                        </div>
                    })
                }
            </div>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <div
                className='flex md:flex-row xs:flex-col md:gap-10 xs:gap-2'>
                {
                    topActions?.map((item, index) => {
                        return (
                            <button
                                key={index}
                                onClick={(e) => { item.action() }}
                                className='flex items-center justify-center gap-1 md:gap-2 whitespace-nowrap xs:px-3 xs:py-2 md:px-5 cursor-pointer
                                rounded-md border p-1'
                            >
                                {item.name}
                            </button>
                        )
                    })
                }
            </div>

        )

    })

    useEffect(() => {
        if (options.bd) {

            if (!data?.length) {
                setIsLoading(true);
            } else {
                setIsRefetching(true);
            }

            const params: Params = {
                page: pagination.pageIndex + 1,
                limit: pagination.pageSize,
                search: globalFilter,
                order: sorting[0]?.desc ? 'ASC' : 'DESC',
                // orderBy: sorting[0]?.id || '0',
            };

            try {

                getInfo(params).then((res) => {
                    setData(res.data);
                    setRowCount(res.meta.total);
                }).catch((error) => {
                    console.error(error);
                })

            } catch (error) {
                console.error(error);
                return;
            } finally {
                setIsLoading(false);
                setIsRefetching(false);
            }
        }

    }, [
        columnFilters,
        globalFilter,
        pagination.pageIndex,
        pagination.pageSize,
        sorting,
        status,
        reload
    ])

    return (
        <>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale='es-mx'
            >
                <ThemeProvider theme={TABLETHEME}>
                    <div
                        className="w-full overflow-x-auto md:overflow-visible"
                        style={{
                            padding: '8px',
                            minWidth: 0,
                            WebkitOverflowScrolling: 'touch',
                        }}
                    >
                        <MaterialReactTable
                            table={table}
                        />
                    </div>
                </ThemeProvider>

            </LocalizationProvider>

        </>
    )
}