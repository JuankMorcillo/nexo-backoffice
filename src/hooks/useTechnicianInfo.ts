'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { fetchTechnicians } from '../app/store/slices/usersSlice';

export default function useTechnicianInfo() {

    const [technicians, setTechnicians] = useState<any[]>([])
    const { data: session } = useSession()
    const dispatch = useDispatch<AppDispatch>()

    const handleGetTechnicians = async () => {

        const params: Params = {
            page: 1,
            limit: 9999,
            search: '',
            order: 'DESC',
            orderBy: undefined,
        }

        if (session?.user.access_token) {
            const result = await dispatch(
                fetchTechnicians({ token: session.user.access_token, params: params })
            );

            const auxData = []

            if (result.payload.data) {
                for (const type of result.payload.data) {
                    auxData.push({ value: type.id, label: type.name })
                }
            }

            setTechnicians(auxData)

        }

    }

    useEffect(() => {
        handleGetTechnicians()
    }, [session])

    return {
        technicians
    }

}