'use client';

import Forms from '@/src/app/components/form'
import Iconos from '@/src/app/components/ui/hooks/iconos'
import { AppDispatch } from '@/src/app/store'
import { clearProcessMessageBranch, setSuccessBranch } from '@/src/app/store/slices/branchesSlice'
import { clearProcessMessageOrderTypes, editOrderTypeSlice, fetchOrderTypeById, selectOrderTypesLoading, selectOrderTypesProcessMessage, selectOrderTypesSuccess, setSuccessOrderTypes } from '@/src/app/store/slices/orderTypesSlice'
import { triggerReload } from '@/src/app/store/slices/reloadSlice'
import { fillToastInfo } from '@/src/app/store/slices/toastSlice'
import { OrderType } from '@/src/app/types/orders'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
    id: number
}

export default function EditOrderType({ id }: Props) {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()

    const loading = useSelector(selectOrderTypesLoading)
    const message = useSelector(selectOrderTypesProcessMessage)
    const success = useSelector(selectOrderTypesSuccess)

    const { successIcon } = Iconos({ classNames: 'size-6 text-green-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })
    const { circleXMarkIcon } = Iconos({ classNames: 'size-6 text-red-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })

    const [info, setInfo] = useState<OrderType>()

    const [data, setData] = useState()

    const inputs: Inputs = [
        {
            id: 'name',
            label: 'Nombre',
            type: 'text',
            placeholder: 'Nombre del tipo de orden',
            required: true
        },
        {
            id: 'description',
            label: 'Descripción',
            type: 'text',
            placeholder: 'Descripción del tipo de orden',
            required: false
        },
    ]

    const styles = {
        cols: 1,
        textButton: 'Editar Tipo de Orden',
    }

    const fetchOrderType = async () => {

        if (session?.user.access_token) {
            try {
                const response = await dispatch(
                    fetchOrderTypeById({ token: session.user.access_token, id: 1 })
                )
                if (response.type === 'order-types/fetchOrderTypeById/fulfilled') {
                    setData(response.payload);
                }
            } catch (error) {
                console.error('Error fetching branch:', error);
            }
        }
    }

    const handleEditOrderType = async () => {
        if (session?.user.access_token) {
            try {
                const result = await dispatch(
                    editOrderTypeSlice({ token: session.user.access_token, order_type: info as OrderType })
                )
                if (result.type === 'order-types/editOrderType/fulfilled') {
                    setInfo(undefined)
                }
            } catch (error) {
                console.error('Error editing order type:', error);
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
            dispatch(clearProcessMessageOrderTypes())
        }


        if (success) dispatch(triggerReload()); dispatch(setSuccessOrderTypes(false))

    }, [message, success])

    useEffect(() => {
        if (id) fetchOrderType();
    }, [id])

    useEffect(() => {
        if (info) handleEditOrderType();
    }, [info])

    return (
        <div className='flex justify-center'>
            {
                data && <Forms inputs={inputs} styles={styles} data={data} setInfo={setInfo} submitting={loading} />
            }
        </div>
    )
}