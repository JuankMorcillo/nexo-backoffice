'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { fetchQuestionTypes } from '../app/store/slices/questionTypesSlice';

export default function useQuestionTypes() {

    const [questionTypes, setQuestionTypes] = useState<any[]>([])
    const { data: session } = useSession()
    const dispatch = useDispatch<AppDispatch>()

    const handleGetQuestionTypes = async () => {
        const params: Params = {
            page: 1,
            limit: 9999,
            search: '',
            order: 'DESC',
            orderBy: undefined,
        }

        if (session?.user.access_token) {
            const result = await dispatch(
                fetchQuestionTypes({ token: session.user.access_token, params: params })
            );

            const auxData = []

            if (result.payload.data) {
                for (const type of result.payload.data) {
                    auxData.push({ value: type.id, label: type.name })
                }
            }

            setQuestionTypes(auxData)

        }
    }

    useEffect(() => {
        handleGetQuestionTypes()
    }, [session])


    return {
        questionTypes,
    }
}