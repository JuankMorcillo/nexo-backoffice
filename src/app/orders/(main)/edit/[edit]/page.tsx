'use client';

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../../store'
import { useSession } from 'next-auth/react'
import { clearProcessMessageOrder, createOrderSlice, editOrderSlice, fetchOrderById, selectOrderLoading, selectOrderProcessMessage, selectOrderSuccess, setSuccessOrder } from '../../../../store/slices/ordersSlice'
import Inputs from '../../../../components/inputs'
import useClienteInfo from '@/src/hooks/useClienteInfo'
import useBranchInfo from '@/src/hooks/useBranchInfo'
import TaskBuilder from '../../../../components/taskBuilder';
import { Order } from '../../../../types/orders';
import { fillToastInfo } from '../../../../store/slices/toastSlice';
import Iconos from '../../../../components/ui/hooks/iconos';
import { useParams } from 'next/navigation';
import useEquipmentInfo from '@/src/hooks/useEquipmentInfo';
import useOrderTypes from '@/src/hooks/useOrderTypes';
import useTechnicianInfo from '@/src/hooks/useTechnicianInfo';

export default function EditOrder() {

    const { edit: order_id } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()

    const loading = useSelector(selectOrderLoading)
    const message = useSelector(selectOrderProcessMessage)
    const success = useSelector(selectOrderSuccess)

    const [didLoad, setDidLoad] = useState(false)
    const [client_id, setClient_id] = useState(0)
    const [branch_id, setBranch_Id] = useState(0)
    const [data, setData] = useState()

    const { clients } = useClienteInfo()
    const { branches } = useBranchInfo({ client_id })
    const { equipments } = useEquipmentInfo({ branch_id })
    const { orderTypes } = useOrderTypes()
    const { technicians } = useTechnicianInfo()

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

    const orderInputs: Inputs = [
        {
            id: 'branch.clients_id',
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
            options: orderTypes,
            required: false,
        }
    ]

    const fetchOrder = async () => {
        if (session?.user.access_token) {
            try {
                const id = parseInt(order_id as string, 10)

                const response = await dispatch(
                    fetchOrderById({ token: session.user.access_token, id })
                )
                if (response.type === 'orders/fetchOrderById/fulfilled') {
                    setData(response.payload)
                    setClient_id(response.payload.branch.clients_id)
                    setBranch_Id(response.payload.branches_id)

                    form.reset(response.payload)
                }
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        }
    }

    const onSubmit = async (data: any) => {
        if (session?.user.access_token) {
            await dispatch(editOrderSlice({ order: data, token: session.user.access_token }))
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
            dispatch(clearProcessMessageOrder())
        }

        if (success) dispatch(setSuccessOrder(false))

    }, [message, success])

    useEffect(() => {
        if (order_id) fetchOrder()
    }, [order_id, session])


    useEffect(() => {

        if (clients && branches && equipments && orderTypes && technicians && data) setDidLoad(true)

    }, [clients, branches, equipments, orderTypes, technicians, data])


    return (
        <>

            {
                didLoad &&
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex p-6 bg-white rounded-lg shadow-md">
                    <div className="w-full mx-auto flex flex-col gap-4">
                        <h1 className="text-2xl font-bold mb-6">Editar Orden</h1>

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
                                equipments={equipments}
                                technicians={technicians}
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