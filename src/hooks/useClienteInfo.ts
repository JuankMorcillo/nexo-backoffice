'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { fetchClients } from '../app/store/slices/clientsSlice';
import { Params } from '../app/types/params';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';

export default function useClienteInfo() {

    const [clients, setClients] = useState<any[]>()
    const { data: session } = useSession()
    const dispatch = useDispatch<AppDispatch>()

    const handleGetClients = async () => {

        const params: Params = {
            page: 1,
            limit: 9999,
            search: '',
            order: 'DESC',
            orderBy: undefined,
        }

        if (session?.user.access_token) {
            const result = await dispatch(
                fetchClients({ token: session.user.access_token, params: params })
            );

            const auxData = []

            if (result.payload.data) {
                for (const client of result.payload.data) {
                    auxData.push({ value: client.id, label: client.name })
                }
            }

            setClients(auxData)

        }
    }

    useEffect(() => {
        handleGetClients()
    }, [session])


    return { clients, setClients }

}