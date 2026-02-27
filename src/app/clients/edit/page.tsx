'use client';

import { useEffect, useState } from 'react'
import Forms from '../../components/form';
import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { clearProcessMessage, editClientSlice, fetchClientById, selectClientsProcessMessage, selectClientsSuccess, setSuccess } from '../../store/slices/clientsSlice';
import { Client } from '../../types/clients';
import { triggerReload } from '../../store/slices/reloadSlice';
import { fillToastInfo } from '../../store/slices/toastSlice';
import Iconos from '../../components/ui/hooks/iconos';

type Props = {
    id: number;
}

export default function EditClient({ id }: Props) {

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

    const [data, setData] = useState()

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
        textButton: 'Actualizar Cliente',
    }

    const fetchClient = async () => {
        if (session?.user.access_token) {
            try {
                const response = await dispatch(
                    fetchClientById({ token: session.user.access_token, id })
                )
                if (response.type === 'clients/fetchClientById/fulfilled') {
                    setData(response.payload);
                }
            } catch (error) {
                console.error('Error fetching client:', error);
            }
        }
    }

    const handleEditClient = async () => {
        if (session?.user.access_token) {
            const result = await dispatch(
                editClientSlice({ token: session.user.access_token, ...info })
            )

            if (result.type == 'clients/editClient/fulfilled') {
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
        fetchClient();
    }, [id])


    useEffect(() => {
        if (info.nit && info.name && info.address && info.phone) {
            handleEditClient();
        }
    }, [info])


    return (
        <div className='flex justify-center'>
            <Forms inputs={inputs} styles={styles} data={data} setInfo={setInfo} submitting={loading} />
        </div>
    )
}