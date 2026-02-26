'use client';

import { useSession } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import MyTable from '../components/table'
import { columns } from './ConstVariables'
import { fetchUsers } from '../store/slices/usersSlice';

export default function Users() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()

    const handleFetchUsers = async (params: Params) => {
        if (session?.user.access_token) {
            const result = await dispatch(
                fetchUsers({ token: session.user.access_token, params: params })
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
                getInfo={handleFetchUsers}
                options={{ bd: true }}
            />
        </>
    )
}