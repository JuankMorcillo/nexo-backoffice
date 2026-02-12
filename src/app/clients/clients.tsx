'use client';

import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { fetchClients } from '../store/slices/clientsSlice'
import { Params } from '../types/params'
import { AppDispatch } from '../store'
import MyTable from '../components/table'
import { columns } from './ConstVariables'
import { useState } from 'react';
import Modal from '../components/modal';
import { Actions, TopActions } from '../types/table';
import EditClient from './edit/page';
import CreateClient from './create/page';
import Iconos from '../components/ui/hooks/iconos';

export default function Clients() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()
    const [modalCreate, setModalCreate] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [client_id, setClient_Id] = useState(0)

    const { pencilIcon } = Iconos({ fill: 'currentColor', classNames: 'size-6', stroke: 'currentColor', strokeWidth: 1.5 })

    const handleFetchClients = async (params: Params) => {
        if (session?.user.access_token) {
            const result = await dispatch(
                fetchClients({ token: session.user.access_token, params: params })
            );
            return {
                meta: result.payload?.meta || { total: 0 },
                data: result.payload?.data || [],
            };
        }
        return { meta: { total: 0 }, data: [] };
    }

    const actions: Actions[] = [
        {
            name: 'Editar',
            icon: pencilIcon,
            action: (row) => {
                setClient_Id(row.id)
                setModalEdit(true)
            }
        }
    ]
    
    const topActions: TopActions[] = [
        {
            name: 'Crear Cliente',
            action: () => setModalCreate(true)
        }
    ]

    return (
        <>
            <MyTable
                columns={columns}
                getInfo={handleFetchClients}
                options={{ bd: true }}
                topActions={topActions}
                actions={actions}
            />

            <Modal
                open={modalCreate}
                setOpen={setModalCreate}
                title="Crear Cliente"
                children={
                    <CreateClient />
                }
                x_icon={true}
            />

            <Modal
                open={modalEdit}
                setOpen={setModalEdit}
                title="Editar Cliente"
                children={
                    <EditClient id={client_id} />
                }
                x_icon={true}
            />

        </>
    )
}