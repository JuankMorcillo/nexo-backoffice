'use client';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store'
import { useSession } from 'next-auth/react'
import { clearProcessMessageBranch, editBranchSlice, fetchBranchById, selectBranchesLoading, selectBranchesProcessMessage, selectBranchesSuccess, setSuccessBranch } from '../../store/slices/branchesSlice'
import Iconos from '../../components/ui/hooks/iconos'
import useClienteInfo from '@/src/hooks/useClienteInfo'
import { Branch } from '../../types/branches'
import Inputs from '../../components/inputs'
import { fillToastInfo } from '../../store/slices/toastSlice'
import { triggerReload } from '../../store/slices/reloadSlice'

type Props = {
    id: number
}

export default function EditBranch({ id }: Props) {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()

    const loading = useSelector(selectBranchesLoading)
    const message = useSelector(selectBranchesProcessMessage)
    const success = useSelector(selectBranchesSuccess)

    const { successIcon } = Iconos({ classNames: 'size-6 text-green-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })
    const { circleXMarkIcon } = Iconos({ classNames: 'size-6 text-red-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })

    const { clients } = useClienteInfo()

    const [info, setInfo] = useState<Branch>()

    const [data, setData] = useState()

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
        textButton: 'Editar Sucursal',
    }

    const fetchBranch = async () => {

        if (session?.user.access_token) {
            try {
                const response = await dispatch(
                    fetchBranchById({ token: session.user.access_token, id })
                )
                if (response.type === 'branches/fetchBranchById/fulfilled') {
                    setData(response.payload);
                }
            } catch (error) {
                console.error('Error fetching branch:', error);
            }
        }
    }

    const handleEditBranch = async () => {
        if (session?.user.access_token) {
            try {
                const result = await dispatch(
                    editBranchSlice({ token: session.user.access_token, branch: info as Branch })
                )
                if (result.type === 'branches/editBranch/fulfilled') {
                    setInfo(undefined)
                }
            } catch (error) {
                console.error('Error editing branch:', error);
            }
        }
    }

    useEffect(() => {

        if (message) {
            dispatch(fillToastInfo({
                id: new Date().getTime().toString(),
                message: message || 'Sucursal actualizada exitosamente',
                position: 'top-right',
                icon: success ? successIcon : circleXMarkIcon,
                duration: 3000,
            }))
            clearProcessMessageBranch()
        }


        if (success) dispatch(triggerReload()); dispatch(setSuccessBranch(false))

    }, [message, success])

    useEffect(() => {
        if (id) fetchBranch();
    }, [id])

    useEffect(() => {
        if (info) handleEditBranch();
    }, [info])

    return (
        <div className='flex justify-center'>
            {
                data && clients && <Inputs inputs={inputs} styles={styles} data={data} setInfo={setInfo} submitting={loading} />
            }
        </div>
    )
}