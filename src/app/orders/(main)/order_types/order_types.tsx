'use client';

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { useSession } from 'next-auth/react'
import Iconos from '../../components/ui/hooks/iconos'
import { fetchOrderTypes } from '../../store/slices/orderTypesSlice'
import { Actions, TopActions } from '../../types/table'
import MyTable from '../../components/table'
import Modal from '../../components/modal'
import CreateOrderType from './create/page'
import EditOrderType from './edit/page'
import { order_types_columns } from './orderTypeColumns'

export default function OrderTypes() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()
    const [modalCreate, setModalCreate] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [order_type_id, setOrderTypeId] = useState(0)

    const { pencilIcon } = Iconos({ fill: 'currentColor', classNames: 'size-6', stroke: 'currentColor', strokeWidth: 1.5 })

    const handleFetchOrderTypes = async (params: Params) => {
        if (session?.user.access_token) {
            const result = await dispatch(
                fetchOrderTypes({ token: session.user.access_token, params: params })
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
                setOrderTypeId(row.id)
                setModalEdit(true)
            }
        }
    ]

    const topActions: TopActions[] = [
        {
            name: 'Crear Tipo de orden',
            action: () => setModalCreate(true)
        }
    ]

    return (
        <>

            <MyTable
                columns={order_types_columns}
                getInfo={handleFetchOrderTypes}
                options={{ bd: true }}
                topActions={topActions}
                actions={actions}
            />

            <Modal
                open={modalCreate}
                setOpen={setModalCreate}
                title="Crear Tipo de orden"
                children={
                    <CreateOrderType />
                }
                x_icon={true}
            />

            <Modal
                open={modalEdit}
                setOpen={setModalEdit}
                title="Editar Tipo de orden"
                children={
                    <EditOrderType id={order_type_id} />
                }
                x_icon={true}
            />

        </>
    )
}