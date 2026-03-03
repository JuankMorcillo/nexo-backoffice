'use client';

import Forms from '@/src/app/components/form'
import Iconos from '@/src/app/components/ui/hooks/iconos'
import { AppDispatch } from '@/src/app/store'
import { clearProcessMessageQuestionTypes, editQuestionTypeSlice, fetchQuestionTypeById, selectQuestionTypesLoading, selectQuestionTypesProcessMessage, selectQuestionTypesSuccess, setSuccessQuestionTypes } from '@/src/app/store/slices/questionTypesSlice'
import { triggerReload } from '@/src/app/store/slices/reloadSlice'
import { fillToastInfo } from '@/src/app/store/slices/toastSlice'
import { QuestionType } from '@/src/app/types/forms'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

type Props = {
    id: number
}

export default function page({ id }: Props) {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()

    const loading = useSelector(selectQuestionTypesLoading)
    const message = useSelector(selectQuestionTypesProcessMessage)
    const success = useSelector(selectQuestionTypesSuccess)

    const { successIcon } = Iconos({ classNames: 'size-6 text-green-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })
    const { circleXMarkIcon } = Iconos({ classNames: 'size-6 text-red-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })

    const [info, setInfo] = useState<QuestionType>()

    const [data, setData] = useState()

    const inputs: Inputs = [
        {
            id: 'name',
            label: 'Nombre',
            type: 'text',
            placeholder: 'Nombre del tipo de pregunta',
            required: true
        },
        {
            id: 'description',
            label: 'Descripción',
            type: 'text',
            placeholder: 'Descripción del tipo de pregunta',
            required: false
        },
    ]

    const styles = {
        cols: 1,
        textButton: 'Editar Tipo de Pregunta',
    }

    const fetchQuestionType = async () => {

        if (session?.user.access_token) {
            try {
                const response = await dispatch(
                    fetchQuestionTypeById({ token: session.user.access_token, id })
                )
                if (response.type === 'question-types/fetchQuestionTypeById/fulfilled') {
                    setData(response.payload);
                }
            } catch (error) {
                console.error('Error fetching branch:', error);
            }
        }
    }

    const handleEditQuestionType = async () => {
        if (session?.user.access_token && info) {

            const result = await dispatch(
                editQuestionTypeSlice({ token: session.user.access_token, question_type: info as QuestionType })
            )

            if (result.type == 'question-types/editQuestionType/fulfilled') {
                setInfo(undefined)
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
            dispatch(clearProcessMessageQuestionTypes())
        }


        if (success) dispatch(triggerReload()); dispatch(setSuccessQuestionTypes(false))

    }, [message, success])

    useEffect(() => {
        if (id) fetchQuestionType();
    }, [id])

    useEffect(() => {
        if (info) handleEditQuestionType();
    }, [info])

    return (
        <div className='flex justify-center'>
            {
                data && <Forms inputs={inputs} styles={styles} data={data} setInfo={setInfo} submitting={loading} />
            }
        </div>
    )
}