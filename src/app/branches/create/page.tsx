'use client';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { useSession } from 'next-auth/react';
import { clearProcessMessageBranch, createBranchSlice, selectBranchesLoading, selectBranchesProcessMessage, selectBranchesSuccess, setSuccessBranch } from '../../store/slices/branchesSlice';
import Iconos from '../../components/ui/hooks/iconos';
import { Branch } from '../../types/branches';
import { fillToastInfo } from '../../store/slices/toastSlice';
import { triggerReload } from '../../store/slices/reloadSlice';
import Forms from '../../components/form';
import useClienteInfo from '@/src/hooks/useClienteInfo';


export default function CreateBranch() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()

    const loading = useSelector(selectBranchesLoading)
    const message = useSelector(selectBranchesProcessMessage)
    const success = useSelector(selectBranchesSuccess)

    const { successIcon } = Iconos({ classNames: 'size-6 text-green-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })
    const { circleXMarkIcon } = Iconos({ classNames: 'size-6 text-red-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })

    const { clients } = useClienteInfo()

    const [info, setInfo] = useState<Branch>()

    const inputs: Inputs = [
        {
            id: 'name',
            label: 'Nombre',
            type: 'text',
            placeholder: 'Nombre de la sucursal',
            required: true
        },
        {
            id: 'address',
            label: 'Dirección',
            type: 'text',
            placeholder: 'Dirección de la sucursal',
            required: true
        },
        {
            id: 'phone',
            label: 'Teléfono',
            type: 'text',
            placeholder: 'Teléfono de la sucursal',
            required: true
        },
        {
            id: 'clients_id',
            label: 'Cliente',
            type: 'select',
            list: true,
            required: true,
            options: clients
        }
    ]

    const styles = {
        cols: 1,
        textButton: 'Guardar Sucursal',
    }

    const handleCreateBranch = async () => {
        if (session?.user.access_token) {

            const result = await dispatch(
                createBranchSlice({ token: session.user.access_token, branch: info as Branch })
            )

            if (result.type == 'branches/createBranch/fulfilled') {
                setInfo(undefined)
            }

        }
    }

    useEffect(() => {

        if (message) {
            dispatch(fillToastInfo({
                id: new Date().getTime().toString(),
                message: message || 'Cliente actualizado exitosamente',
                position: 'top-right',
                icon: success ? successIcon : circleXMarkIcon,
                duration: 3000,
            }))
            clearProcessMessageBranch()
        }


        if (success) dispatch(triggerReload()); dispatch(setSuccessBranch(false))

    }, [message, success])

    useEffect(() => {
        if (info) handleCreateBranch()
    }, [info])

    return (
        <div className='flex justify-center'>
            {
                clients && <Forms inputs={inputs} setInfo={setInfo} styles={styles} submitting={loading} />
            }
        </div>
    )
}