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
import CreateClient from './create/page';

export default function Clients() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()
    const [modalCreate, setModalCreate] = useState(false)

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

        </>
    )
}