'use client';

import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { fetchClients } from '../store/slices/clientsSlice'
import { Params } from '../types/params'
import { AppDispatch } from '../store'
import MyTable from '../components/table'
import { columns } from './ConstVariables'

export default function Clients() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()

    const handleFetchClients = async (params: Params) => {
        if (session?.user.access_token) {
            const result = await dispatch(
                fetchClients({ token: session.user.access_token, params: params })
            );
            return {
                meta: result.payload?.meta || { total: 0 },
                data: result.payload?.data || [],
            };
        }
        return { meta: { total: 0 }, data: [] };
    }

    return (
        <>
            <MyTable
                columns={columns}
                getInfo={handleFetchClients}
                options={{ bd: true }}
            />

        </>
    )
}