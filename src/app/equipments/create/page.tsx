import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store'
import { useSession } from 'next-auth/react'
import { clearProcessMessageEqu, createEquipmentSlice, selectEquipmentLoading, selectEquipmentMessage, selectEquipmentProcessMessage, selectEquipmentSuccess } from '../../store/slices/EquipmentSlice'
import Iconos from '../../components/ui/hooks/iconos'
import { Equipment } from '../../types/equipment'
import Inputs from '../../components/inputs'
import { fillToastInfo } from '../../store/slices/toastSlice'
import { triggerReload } from '../../store/slices/reloadSlice'
import { setSuccess } from '../../store/slices/clientsSlice'

export default function CreateEquipment() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()

    const loading = useSelector(selectEquipmentLoading)
    const message = useSelector(selectEquipmentProcessMessage)
    const success = useSelector(selectEquipmentSuccess)

    const { successIcon } = Iconos({ classNames: 'size-6 text-green-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })
    const { circleXMarkIcon } = Iconos({ classNames: 'size-6 text-red-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })

    const [info, setInfo] = useState<Equipment>()

    const inputs: Inputs = [
        {
            id: 'serial',
            label: 'Serial',
            type: 'text',
            placeholder: 'Serial del equipo',
            required: true
        },
        {
            id: 'brand',
            label: 'Marca',
            type: 'text',
            placeholder: 'Marca del equipo',
            required: true
        },
        {
            id: 'model',
            label: 'Modelo',
            type: 'text',
            placeholder: 'Modelo del equipo',
            required: true
        },
        {
            id: 'description',
            label: 'Descripción',
            type: 'text',
            placeholder: 'Descripción del equipo',
            required: true
        },
        {
            id: 'branches_id',
            label: 'Sucursal',
            type: 'select',
            list: true,
            required: true,
            options: [
                {
                    value: 1,
                    label: 'Sucursal 1'
                }
            ]
        }
    ]

    const styles = {
        cols: 1,
        textButton: 'Guardar Equipo',
    }

    const handleCreateEquipment = async () => {
        if (session?.user.access_token) {

            const result = await dispatch(
                createEquipmentSlice({ token: session.user.access_token, equipment: info as Equipment })
            )

            if (result.type == 'equipments/createEquipment/fulfilled') {
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
            clearProcessMessageEqu()
        }


        if (success) dispatch(triggerReload()); dispatch(setSuccess(false))

    }, [message, success])


    useEffect(() => {
        if (info) handleCreateEquipment()
    }, [info])


    return (
        <div className='flex justify-center'>
            <Inputs inputs={inputs} setInfo={setInfo} styles={styles} submitting={loading} />
        </div>
    )
}