'use client';

import React, { useEffect, useState } from 'react'
import { OrderType } from '../app/types/orders';
import { useSession } from 'next-auth/react';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { fetchOrderTypes } from '../app/store/slices/orderTypesSlice';

export default function useOrderTypes() {

    const [orderTypes, setOrderTypes] = useState<any[]>()
    const { data: session } = useSession()
    const dispatch = useDispatch<AppDispatch>()

    const handleGetOrderTypes = async () => {
        const params: Params = {
            page: 1,
            limit: 9999,
            search: '',
            order: 'DESC',
            orderBy: undefined,
        }

        if (session?.user.access_token) {
            const result = await dispatch(
                fetchOrderTypes({ token: session.user.access_token, params: params })
            );

            const auxData = []

            if (result.payload.data) {
                for (const type of result.payload.data) {
                    auxData.push({ value: type.id, label: type.name })
                }
            }

            setOrderTypes(auxData)

        }
    }

    useEffect(() => {
        handleGetOrderTypes()
    }, [session])


    return {
        orderTypes,
    }


}