import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { AppDispatch } from '../app/store'
import { useDispatch } from 'react-redux'
import { fetchBranches } from '../app/store/slices/branchesSlice'

type Props = { client_id: number }

export default function useBranchInfo({ client_id }: Props) {

    const [branches, setBranches] = useState<any[]>()
    const { data: session } = useSession()
    const dispatch = useDispatch<AppDispatch>()

    const handleGetBranches = async () => {

        const params: Params = {
            page: 1,
            limit: 9999,
            search: '',
            order: 'DESC',
            orderBy: undefined,
        }

        if (session?.user.access_token) {
            const result = await dispatch(
                fetchBranches({ token: session.user.access_token, params: params })
            );

            const auxData = []

            if (result.payload.data) {
                for (const client of result.payload.data) {
                    auxData.push({ value: client.id, label: client.name })
                }
            }

            setBranches(auxData)

        }
    }

    useEffect(() => {
        handleGetBranches()
    }, [session])

    return { branches, setBranches }

}