'use client';

import React, { useEffect, useState } from 'react'
import { AppDispatch } from '@/src/app/store'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import { clearProcessMessageOrderTypes, createOrderTypeSlice, selectOrderTypesLoading, selectOrderTypesProcessMessage, selectOrderTypesSuccess, setSuccessOrderTypes } from '@/src/app/store/slices/orderTypesSlice'
import Iconos from '@/src/app/components/ui/hooks/iconos'
import { OrderType } from '@/src/app/types/orders'
import { fillToastInfo } from '@/src/app/store/slices/toastSlice'
import { triggerReload } from '@/src/app/store/slices/reloadSlice'
import { setSuccessBranch } from '@/src/app/store/slices/branchesSlice'
import Forms from '@/src/app/components/form'



export default function CreateOrderType() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()

    const loading = useSelector(selectOrderTypesLoading)
    const message = useSelector(selectOrderTypesProcessMessage)
    const success = useSelector(selectOrderTypesSuccess)

    const { successIcon } = Iconos({ classNames: 'size-6 text-green-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })
    const { circleXMarkIcon } = Iconos({ classNames: 'size-6 text-red-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })

    const [info, setInfo] = useState<OrderType>()

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
        textButton: 'Guardar Tipo de Orden',
    }

    const handleCreateOrderType = async () => {
        if (session?.user.access_token && info) {

            info.subscribers_id = session.user.user.subscribers_id

            const result = await dispatch(
                createOrderTypeSlice({ token: session.user.access_token, order_type: info as OrderType })
            )

            if (result.type == 'order-types/createOrderType/fulfilled') {
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
            dispatch(clearProcessMessageOrderTypes())
        }


        if (success) dispatch(triggerReload()); dispatch(setSuccessOrderTypes(false))

    }, [message, success])

    useEffect(() => {
        if (info) handleCreateOrderType()
    }, [info])

    return (
        <>

            <div className='flex justify-center'>
                <Forms inputs={inputs} setInfo={setInfo} styles={styles} submitting={loading} />
            </div>
        </>
    )
}