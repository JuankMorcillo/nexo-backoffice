'use client';

import Forms from '@/src/app/components/form';
import { AppDispatch } from '@/src/app/store'
import { fetchFormById, selectForms } from '@/src/app/store/slices/formsSlice'
import { Question } from '@/src/app/types/forms';
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function page() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()

    const [didLoad, setDidLoad] = useState(false)
    const [info, setInfo] = useState()
    const [inputs, setInputs] = useState<any>()

    const form = useSelector(selectForms)

    const { order_id, form_id, task_id } = useParams()

    const createInputs = (questions: Question[]) => {
        const inputs: Inputs = []
        for (const question of questions) {
            let options

            if (question.responses) {
                options = question.responses as Array<{ value: string, id: number }>
                options = options.map(option => ({
                    label: option.value,
                    value: option.id
                }))
            }

            inputs.push({
                id: String(question.id),
                label: question.name || '',
                type: question.questionType?.name.toLocaleLowerCase() || 'text',
                required: question?.required == 1 ? true : false,
                options: options,                
            })
        }

        setInputs(inputs)
    }

    const fetchForm = async () => {

        if (session?.user?.access_token) {
            try {
                const response = await dispatch(
                    fetchFormById({ token: session.user.access_token, id: Number(form_id) })
                )

                createInputs(response.payload.questions)

            } catch (error) {
                console.error('Error fetching form:', error);
            }
        }

    }

    const styles = {
        cols: 1,
        textButton: "Cerrar tarea",
    }

    useEffect(() => {
        fetchForm()
    }, [session])

    useEffect(() => {
        if (form && inputs) setDidLoad(true)
    }, [form, inputs])

    useEffect(() => {
        if (info && Object.keys(info).length > 0) {

            const formattedData = Object.entries(info).map(([questionId, responseValue]) => ({
                tasks_id: Number(task_id),
                forms_id: Number(form_id),
                questions_id: Number(questionId),
                response_value: responseValue
            }))

            console.log("Arreglo listo para enviar al backend:", formattedData)

        }
    }, [info])

    return (
        <>

            {
                didLoad ?
                    <div className='flex flex-col w-full max-w-120 min-h-screen p-4'>
                        <Forms inputs={inputs} styles={styles} setInfo={setInfo} submitting={false} />
                    </div>
                    :
                    <></>
            }

        </>
    )
}