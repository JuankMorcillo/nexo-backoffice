'use client';

import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';
import Iconos from '../components/ui/hooks/iconos';
import { Params } from '../types/params';
import { fetchEquipments } from '../store/slices/EquipmentSlice';
import { Actions, TopActions } from '../types/table';
import Modal from '../components/modal';
import EditEquipment from './edit/page';
import CreateEquipment from './create/page';
import { equipment_columns } from './equipmentColumns';
import MyTable from '../components/table';

export default function Equipment() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()
    const [modalCreate, setModalCreate] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [equipment_id, setEquipment_Id] = useState(0)

    const { pencilIcon } = Iconos({ fill: 'currentColor', classNames: 'size-6', stroke: 'currentColor', strokeWidth: 1.5 })

    const handleFetchEquipments = async (params: Params) => {
        if (session?.user.access_token) {
            const result = await dispatch(
                fetchEquipments({ token: session.user.access_token, params: params })
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
                setEquipment_Id(row.id)
                setModalEdit(true)
            }
        }
    ]

    const topActions: TopActions[] = [
        {
            name: 'Crear Equipo',
            action: () => setModalCreate(true)
        }
    ]

    return (
        <>
            <MyTable
                columns={equipment_columns}
                getInfo={handleFetchEquipments}
                options={{ bd: true }}
                topActions={topActions}
                actions={actions}
            />

            <Modal
                open={modalCreate}
                setOpen={setModalCreate}
                title="Crear Cliente"
                children={
                    <CreateEquipment />
                }
                x_icon={true}
            />

            <Modal
                open={modalEdit}
                setOpen={setModalEdit}
                title="Editar Cliente"
                children={
                    <EditEquipment id={equipment_id} />
                }
                x_icon={true}
            />
        </>
    )
}