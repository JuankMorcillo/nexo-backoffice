'use client';

import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../app/store'
import { fetchEquipments } from '../app/store/slices/EquipmentSlice';

type Props = {
    branch_id?: number
}

export default function useEquipmentInfo({ branch_id }: Props) {

    const [equipments, setEquipments] = useState<any[]>([])
    const { data: session } = useSession()
    const dispatch = useDispatch<AppDispatch>()

    const handleGetEquipmentsByBranch = async () => {

        const params: Params = {
            page: 1,
            limit: 9999,
            search: '',
            order: 'DESC',
            orderBy: undefined,
            branchId: branch_id,
        }

        if (session?.user.access_token) {
            const result = await dispatch(
                fetchEquipments({ token: session.user.access_token, params: params })
            );

            const auxData = []

            if (result.payload.data) {
                for (const equipment of result.payload.data) {
                    auxData.push({ value: equipment.id, label: equipment.serial })
                }
            }

            setEquipments(auxData)

        }
    }

    useEffect(() => {
        if (branch_id) handleGetEquipmentsByBranch()
    }, [session, branch_id])

    return {
        equipments,
    }
}