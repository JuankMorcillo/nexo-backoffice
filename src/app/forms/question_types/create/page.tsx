'use client';

import Forms from '@/src/app/components/form';
import Iconos from '@/src/app/components/ui/hooks/iconos'
import { AppDispatch } from '@/src/app/store'
import { clearProcessMessageQuestionTypes, createQuestionTypeSlice, selectQuestionTypesLoading, selectQuestionTypesProcessMessage, selectQuestionTypesSuccess, setSuccessQuestionTypes } from '@/src/app/store/slices/questionTypesSlice'
import { triggerReload } from '@/src/app/store/slices/reloadSlice';
import { fillToastInfo } from '@/src/app/store/slices/toastSlice';
import { QuestionType } from '@/src/app/types/forms'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function CreateQuestionType() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()

    const loading = useSelector(selectQuestionTypesLoading)
    const message = useSelector(selectQuestionTypesProcessMessage)
    const success = useSelector(selectQuestionTypesSuccess)

    const { successIcon } = Iconos({ classNames: 'size-6 text-green-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })
    const { circleXMarkIcon } = Iconos({ classNames: 'size-6 text-red-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })

    const [info, setInfo] = useState<QuestionType>()

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
        textButton: 'Guardar Tipo de Pregunta',
    }

    const handleCreateQuestionType = async () => {
        if (session?.user.access_token && info) {

            const result = await dispatch(
                createQuestionTypeSlice({ token: session.user.access_token, question_type: info as QuestionType })
            )

            if (result.type == 'question-types/createQuestionType/fulfilled') {
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
        if (info) handleCreateQuestionType()
    }, [info])

    return (
        <div className='flex justify-center'>
            <Forms inputs={inputs} setInfo={setInfo} styles={styles} submitting={loading} />
        </div>
    )
}