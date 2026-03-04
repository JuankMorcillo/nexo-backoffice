'use client';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { useSession } from 'next-auth/react';
import { clearProcessMessageEqu, editEquipmentSlice, fetchEquipmentById, selectEquipmentLoading, selectEquipmentProcessMessage, selectEquipmentSuccess, setSuccessEqu } from '../../store/slices/EquipmentSlice';
import Iconos from '../../components/ui/hooks/iconos';
import { Equipment } from '../../types/equipment';
import { fillToastInfo } from '../../store/slices/toastSlice';
import { triggerReload } from '../../store/slices/reloadSlice';
import Forms from '../../components/form';

type Props = {
    id: number;
}

export default function EditEquipment({ id }: Props) {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()

    const loading = useSelector(selectEquipmentLoading)
    const message = useSelector(selectEquipmentProcessMessage)
    const success = useSelector(selectEquipmentSuccess)

    const { successIcon } = Iconos({ classNames: 'size-6 text-green-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })
    const { circleXMarkIcon } = Iconos({ classNames: 'size-6 text-red-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })

    const [info, setInfo] = useState<Equipment>()
    const [data, setData] = useState()

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
        textButton: 'Actualizar Cliente',
    }

    const fetchEquipment = async () => {
        if (session?.user.access_token) {
            try {
                const response = await dispatch(
                    fetchEquipmentById({ token: session.user.access_token, id })
                )
                if (response.type === 'equipments/fetchEquipmentById/fulfilled') {
                    setData(response.payload);
                }
            } catch (error) {
                console.error('Error fetching equipment:', error);
            }
        }
    }

    const handleEditEquipment = async () => {
        if (session?.user.access_token) {
            try {
                const result = await dispatch(
                    editEquipmentSlice({ token: session.user.access_token, equipment: info as Equipment })
                )
                if (result.type === 'equipments/editEquipment/fulfilled') {
                    setInfo(undefined)
                }
            } catch (error) {
                console.error('Error editing equipment:', error);
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
            dispatch(clearProcessMessageEqu())
        }


        if (success) dispatch(triggerReload()); dispatch(setSuccessEqu(false))
    }, [message, success])

    useEffect(() => {
        if (id) fetchEquipment();
    }, [id])


    useEffect(() => {
        if (info) handleEditEquipment();
    }, [info])


    return (
        <div className='flex justify-center'>
            {data && <Forms inputs={inputs} setInfo={setInfo} styles={styles} submitting={loading} data={data} />}
        </div>
    )
}