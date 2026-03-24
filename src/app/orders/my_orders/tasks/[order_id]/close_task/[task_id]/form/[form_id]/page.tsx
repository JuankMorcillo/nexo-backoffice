'use client';

import Forms from '@/src/app/components/form';
import Iconos from '@/src/app/components/ui/hooks/iconos';
import { AppDispatch } from '@/src/app/store'
import { clearFormsProcessMessage, fetchFormById, responseFormSlice, selectForms, selectFormsProcessMessage, selectFormsSuccess, setFormsSuccess } from '@/src/app/store/slices/formsSlice'
import { editTaskSlice, fetchTaskById, selectOrderSuccess, setSuccessOrder } from '@/src/app/store/slices/ordersSlice';
import { fillToastInfo } from '@/src/app/store/slices/toastSlice';
import { Question, TaskForm } from '@/src/app/types/forms';
import { editTask } from '@/src/lib/api/orders';
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function page() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()

    const router = useRouter();

    const [didLoad, setDidLoad] = useState(false)
    const [info, setInfo] = useState()
    const [inputs, setInputs] = useState<any>()
    const [taskInfo, setTaskInfo] = useState({} as any)
    const message = useSelector(selectFormsProcessMessage)
    const success = useSelector(selectFormsSuccess)
    const successOrders = useSelector(selectOrderSuccess)

    const form = useSelector(selectForms)

    const { order_id, form_id, task_id } = useParams()

    const { successIcon } = Iconos({ classNames: 'size-6 text-green-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })
    const { circleXMarkIcon } = Iconos({ classNames: 'size-6 text-red-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })

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

    const fetchTask = async () => {
        if (session?.user?.access_token) {

            try {
                const response = await dispatch(
                    fetchTaskById({ token: session.user.access_token, id: Number(task_id) })
                )
                setTaskInfo(response.payload)
            } catch (error) {
                console.error('Error fetching task:', error);
            }

        }
    }

    const handleSubmit = async () => {
        if (info && Object.keys(info).length > 0) {
            /*                        
                La lógica que manejo para llenar el value y el response; es que si el response
                es un string, se guardara en value, sin importar si es un numero; si es un numero, se asume
                que la respuesta viene de una lista, asi que va en responses_id. El punto es que
                no se debe hacer la conversión en el componente forms para enviar números cuando son ingresados
            
            */

            const formattedData = Object.entries(info).map(([questionId, responseValue]) => ({
                tasks_id: Number(task_id),
                forms_id: Number(form_id),
                questions_id: Number(questionId),
                value: typeof responseValue === 'string' ? responseValue : undefined,
                responses_id: typeof responseValue === 'number' ? responseValue : undefined
            }))

            const response = await dispatch(responseFormSlice({ responses: formattedData as TaskForm[], token: session?.user.access_token || '' }))

            if (response.type == 'forms/responseForm/fulfilled') {

                const task = {
                    id: Number(task_id),
                    end_date: new Date(),
                    status: 4
                }

                const taskResponse = await dispatch(editTaskSlice({ token: session?.user.access_token || '', task }))

                if (taskResponse.type == 'orders/editTask/fulfilled') {
                    router.push(`/orders/my_orders/tasks/${order_id}`);
                }

            }
        }

    }

    const styles = {
        cols: 1,
        textButton: "Cerrar tarea",
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

        if (success && successOrders) dispatch(setFormsSuccess(false), setSuccessOrder(false))

    }, [message, success])

    useEffect(() => {
        fetchTask()
        fetchForm()
    }, [session])

    useEffect(() => {
        if (taskInfo?.status == 4) {
            dispatch(fillToastInfo({
                id: new Date().getTime().toString(),
                message: 'La tarea ya se encuentra finalizada',
                position: 'top-right',
                icon: circleXMarkIcon,
                duration: 3000,
            }))
            router.push(`/orders/my_orders/tasks/${order_id}`);
        }
    }, [taskInfo])


    useEffect(() => {
        if (form && inputs && taskInfo?.status !== 4) setDidLoad(true)
    }, [form, inputs, taskInfo])

    useEffect(() => {
        if (info && Object.keys(info).length > 0) handleSubmit()
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