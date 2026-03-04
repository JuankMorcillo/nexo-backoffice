'use client';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store'
import { useSession } from 'next-auth/react'
import { clearFormsProcessMessage, createFormSlice, selectFormsLoading, selectFormsProcessMessage, selectFormsSuccess, setFormsSuccess } from '../../store/slices/formsSlice'
import useQuestionTypes from '@/src/hooks/useQuestionTyes'
import Iconos from '../../components/ui/hooks/iconos'
import { Form } from '../../types/forms'
import { useForm } from 'react-hook-form'
import Inputs from '../../components/inputs'
import QuestionBuilder from '../../components/QuestionBuilder'
import { fillToastInfo } from '../../store/slices/toastSlice'

export default function CreateForm() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()

    const loading = useSelector(selectFormsLoading)
    const message = useSelector(selectFormsProcessMessage)
    const success = useSelector(selectFormsSuccess)

    const [didLoad, setDidLoad] = useState(false)
    const [question_type, setQuestionType] = useState()

    const { questionTypes } = useQuestionTypes()

    const { successIcon } = Iconos({ classNames: 'size-6 text-green-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })
    const { circleXMarkIcon } = Iconos({ classNames: 'size-6 text-red-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })

    const form = useForm<Form>({
        defaultValues: {
            description: '',
        }
    })

    const { handleSubmit } = form

    const formInputs: Inputs = [
        {
            id: 'name',
            label: 'Nombre del formulario',
            type: 'text',
            required: true,
        },
        {
            id: 'description',
            label: 'Descripción del formulario',
            type: 'text',
            required: true,
        },
    ]

    const onSubmit = async (data: any) => {

        const formData = {
            ...data,
            subscribers_id: session?.user.user.subscribers_id
        }

        if (session?.user.access_token) {
            await dispatch(createFormSlice({ form: formData, token: session.user.access_token }))
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
            dispatch(clearFormsProcessMessage())
        }


        if (success) dispatch(setFormsSuccess(false))

    }, [message, success])

    useEffect(() => {

        if (questionTypes) setDidLoad(true)

    }, [questionTypes])

    return (
        <>

            {
                didLoad &&
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex p-6">

                    <div className="w-full mx-auto flex flex-col gap-4">
                        <h1 className="text-2xl font-bold mb-6">Crear Formulario</h1>

                        <div className='flex flex-row gap-8'>
                            <div className='rounded-md w-full max-w-[20%] bg-white border border-gray-300 p-6'>
                                <Inputs
                                    inputs={formInputs}
                                    form={form}
                                    submitting={loading}
                                />
                            </div>
                            <div className='rounded-md w-full max-w-[80%] bg-white border border-gray-300 p-6'>
                                <QuestionBuilder
                                    form={form}
                                    questionTypes={questionTypes}
                                    setQuestionType={setQuestionType}
                                    questionTypeInfo={question_type}
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-6 py-2 rounded-md font-medium ${loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                            >
                                {loading ? 'Guardando...' : 'Guardar Formulario'}
                            </button>
                        </div>
                    </div>

                </form>
            }


        </>
    )
}