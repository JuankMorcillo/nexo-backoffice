'use client';

import React from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { fetchForms } from '../store/slices/formsSlice';
import { Actions, TopActions } from '../types/table';
import Iconos from '../components/ui/hooks/iconos';
import MyTable from '../components/table';
import { forms_columns } from './formsColumns';


export default function Forms() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()
    const router = useRouter()

    const { pencilIcon } = Iconos({ fill: 'currentColor', classNames: 'size-6', stroke: 'currentColor', strokeWidth: 1.5 })

    const handleFetchForms = async (params: Params) => {
        if (session?.user.access_token) {
            const result = await dispatch(
                fetchForms({ token: session.user.access_token, params: params })
            )
            return {
                meta: result.payload?.meta || { total: 0 },
                data: result.payload?.data || [],
            }
        }
        return { meta: { total: 0 }, data: [] }
    }

    const actions: Actions[] = [
        {
            name: 'Editar',
            icon: pencilIcon,
            action: (row) => {
                router.push(`/forms/edit/${row.id}`)
            }
        }
    ]

    const topActions: TopActions[] = [
        {
            name: 'Crear Formulario',
            action: () => router.push('/forms/create')
        }
    ]

    return (
        <>
            <MyTable
                columns={forms_columns}
                getInfo={handleFetchForms}
                options={{ bd: true }}
                topActions={topActions}
                actions={actions}
            />
        </>
    )
}