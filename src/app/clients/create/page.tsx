'use client';

import { useEffect, useState } from 'react'
import Forms from '../../components/form';
import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { clearProcessMessage, createClientSlice, selectClientsProcessMessage, selectClientsSuccess, setSuccess } from '../../store/slices/clientsSlice';
import { Client } from '../../types/clients';
import { triggerReload } from '../../store/slices/reloadSlice';
import Iconos from '../../components/ui/hooks/iconos';
import { fillToastInfo } from '../../store/slices/toastSlice';

export default function CreateClient() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()

    const loading = useSelector((state: any) => state.clients.loading)
    const message = useSelector(selectClientsProcessMessage)
    const success = useSelector(selectClientsSuccess)

    const { successIcon } = Iconos({ classNames: 'size-6 text-green-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })
    const { circleXMarkIcon } = Iconos({ classNames: 'size-6 text-red-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })

    const [info, setInfo] = useState<Client>({
        name: '',
        nit: '',
        address: '',
        phone: '',
        subscribers_id: session?.user.user.subscribers_id
    })

    const inputs: Inputs = [
        {
            id: 'name',
            label: 'Nombre',
            type: 'text',
            placeholder: 'Nombre del cliente',
            required: true
        },
        {
            id: 'nit',
            label: 'NIT',
            type: 'text',
            placeholder: 'NIT del cliente',
            required: true
        },
        {
            id: 'address',
            label: 'Dirección',
            type: 'text',
            placeholder: 'Dirección del cliente',
            required: true
        },
        {
            id: 'phone',
            label: 'Teléfono',
            type: 'text',
            placeholder: 'Teléfono del cliente',
            required: true
        }
    ]

    const styles = {
        cols: 1,
        textButton: 'Guardar Cliente',
    }

    const handleCreateClient = async () => {
        if (session?.user.access_token) {
            const result = await dispatch(
                createClientSlice({ token: session.user.access_token, ...info })
            )

            if (result.type == 'clients/createClient/fulfilled') {
                setInfo({
                    name: '',
                    nit: '',
                    address: '',
                    phone: '',
                    subscribers_id: session?.user.user.subscribers_id
                })
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
            clearProcessMessage()
        }


        if (success) dispatch(triggerReload()); dispatch(setSuccess(false))
    }, [message, success])

    useEffect(() => {
        if (info.nit && info.name && info.address && info.phone) {
            handleCreateClient();
        }
    }, [info])


    return (
        <div className='flex justify-center'>
            <Forms inputs={inputs} styles={styles} data={info} setInfo={setInfo} submitting={loading} />
        </div>
    )
}