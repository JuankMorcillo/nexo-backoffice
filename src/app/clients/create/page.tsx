'use client';

import { useEffect, useState } from 'react'
import Inputs from '../../components/inputs';
import { AppDispatch } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { createClientSlice } from '../../store/slices/clientsSlice';
import { Client } from '../../types/clients';

export default function CreateClient() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()

    const loading = useSelector((state: any) => state.clients.loading)

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

    const handleCreatePhones = async () => {
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
        if (info.nit && info.name && info.address && info.phone) {
            handleCreatePhones();
        }
    }, [info])


    return (
        <div className='flex justify-center'>
            <Inputs inputs={inputs} styles={styles} data={info} setInfo={setInfo} submitting={loading} />
        </div>
    )
}