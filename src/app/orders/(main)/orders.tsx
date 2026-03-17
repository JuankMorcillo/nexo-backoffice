'use client';

import React from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { fetchOrders } from '../../store/slices/ordersSlice';
import { Actions, TopActions } from '../../types/table';
import Iconos from '../../components/ui/hooks/iconos';
import MyTable from '../../components/table';
import { orders_columns } from './ordersColumns';


export default function Orders() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()
    const router = useRouter()

    const { pencilIcon } = Iconos({ fill: 'currentColor', classNames: 'size-6', stroke: 'currentColor', strokeWidth: 1.5 })

    const handleFetchOrders = async (params: Params) => {
        if (session?.user.access_token) {
            const result = await dispatch(
                fetchOrders({ token: session.user.access_token, params: params })
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
                router.push(`/orders/edit/${row.id}`)
            }
        }
    ]

    const topActions: TopActions[] = [
        {
            name: 'Crear Orden',
            action: () => router.push('/orders/create')
        }
    ]

    return (
        <>
            <MyTable
                columns={orders_columns}
                getInfo={handleFetchOrders}
                options={{ bd: true }}
                topActions={topActions}
                actions={actions}
            />
        </>
    )
}