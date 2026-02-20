'use client';

import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { useSession } from 'next-auth/react';
import Iconos from '../components/ui/hooks/iconos';
import { Params } from '../types/params';
import { fetchBranches } from '../store/slices/branchesSlice';
import { Actions, TopActions } from '../types/table';
import MyTable from '../components/table';
import Modal from '../components/modal';
import CreateBranch from './create/page';
import EditBranch from './edit/page';
import { branches_columns } from './branchesColums';

export default function Branches() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()
    const [modalCreate, setModalCreate] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [branch_id, setBranch_Id] = useState(0)

    const { pencilIcon } = Iconos({ fill: 'currentColor', classNames: 'size-6', stroke: 'currentColor', strokeWidth: 1.5 })

    const handleFetchBranches = async (params: Params) => {
        if (session?.user.access_token) {
            const result = await dispatch(
                fetchBranches({ token: session.user.access_token, params: params })
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
                setBranch_Id(row.id)
                setModalEdit(true)
            }
        }
    ]

    const topActions: TopActions[] = [
        {
            name: 'Crear Sucursal',
            action: () => setModalCreate(true)
        }
    ]

    return (
        <>
            <MyTable
                columns={branches_columns}
                getInfo={handleFetchBranches}
                options={{ bd: true }}
                topActions={topActions}
                actions={actions}
            />

            <Modal
                open={modalCreate}
                setOpen={setModalCreate}
                title="Crear Cliente"
                children={
                    <CreateBranch />
                }
                x_icon={true}
            />

            <Modal
                open={modalEdit}
                setOpen={setModalEdit}
                title="Editar Cliente"
                children={
                    <EditBranch id={branch_id} />
                }
                x_icon={true}
            />
        </>
    )
}