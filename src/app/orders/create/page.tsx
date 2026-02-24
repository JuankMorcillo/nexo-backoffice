'use client';

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store'
import { useSession } from 'next-auth/react'
import { clearProcessMessageOrder, createOrderSlice, selectOrderLoading, selectOrderProcessMessage, selectOrderSuccess, setSuccessOrder } from '../../store/slices/ordersSlice'
import Inputs from '../../components/inputs'
import useClienteInfo from '@/src/hooks/useClienteInfo'
import useBranchInfo from '@/src/hooks/useBranchInfo'
import TaskBuilder from '../../components/taskBuilder';
import { Order } from '../../types/orders';
import { fillToastInfo } from '../../store/slices/toastSlice';
import Iconos from '../../components/ui/hooks/iconos';

export default function CreateOrder() {
    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()

    const loading = useSelector(selectOrderLoading)
    const message = useSelector(selectOrderProcessMessage)
    const success = useSelector(selectOrderSuccess)

    const [didLoad, setDidLoad] = useState(false)
    const [client_id, setClient_id] = useState(0)

    const { clients } = useClienteInfo()
    const { branches } = useBranchInfo({ client_id })

    const { successIcon } = Iconos({ classNames: 'size-6 text-green-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })
    const { circleXMarkIcon } = Iconos({ classNames: 'size-6 text-red-500', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })

    const form = useForm<Order>({
        defaultValues: {
            orders_types_id: 0,
            branches_id: 0,
            tasks: []
        }
    })

    const { handleSubmit } = form

    const orderInputs = [
        {
            id: 'clients_id',
            label: 'Cliente',
            type: 'select',
            list: true,
            set: setClient_id,
            options: clients,
            required: false,
        },
        {
            id: 'branches_id',
            label: 'Sucursal',
            type: 'select',
            list: true,
            options: branches,
            required: false,
        },
        {
            id: 'orders_types_id',
            label: 'Tipo de Orden',
            type: 'select',
            list: true,
            options: [
                { value: 1, label: 'Instalación' },
                { value: 2, label: 'Mantenimiento' },
                { value: 3, label: 'Reparación' },
            ],
            required: false,
        }
    ]

    const onSubmit = async (data: any) => {
        if (session?.user.access_token) {
            await dispatch(createOrderSlice({ order: data, token: session.user.access_token }))
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
            clearProcessMessageOrder()
        }


        if (success) dispatch(setSuccessOrder(false))

    }, [message, success])

    useEffect(() => {

        if (clients && branches) setDidLoad(true)

    }, [clients, branches])


    return (
        <>

            {
                didLoad &&
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex p-6">
                    <div className="w-full mx-auto flex flex-col gap-4">
                        <h1 className="text-2xl font-bold mb-6">Crear Orden</h1>

                        <div className='flex flex-row gap-8'>
                            {/* Inputs principales */}
                            <Inputs
                                inputs={orderInputs}
                                form={form}
                                submitting={loading}
                            />

                            {/* Task Builder */}
                            <TaskBuilder
                                form={form}
                                equipments={[{ value: 1, label: 'Equipo 1' }]}
                                technicians={[{ value: 1, label: 'Técnico 1' }]}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8 flex justify-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-6 py-2 rounded-md font-medium ${loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                            >
                                {loading ? 'Guardando...' : 'Guardar Orden'}
                            </button>
                        </div>
                    </div>
                </form>
            }

        </>
    )
}