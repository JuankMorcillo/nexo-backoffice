'use client';

import Iconos from '@/src/app/components/ui/hooks/iconos';
import { AppDispatch } from '@/src/app/store'
import { fetchOrdersUser, selectOrders } from '@/src/app/store/slices/ordersSlice'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function User_Orders() {

    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()
    const orders = useSelector(selectOrders)

    const { locationDotIcon } = Iconos({ classNames: 'size-6', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })

    const fetchOrders = async () => {
        if (session?.user?.access_token) {

            try {

                const response = await dispatch(
                    fetchOrdersUser({ token: session.user.access_token })
                )

            } catch (error) {
                console.error('Error fetching orders:', error);
            }

        }
    }

    useEffect(() => {
        fetchOrders()
    }, [session])


    return (
        <>

            {
                orders && orders.length > 0 ?
                    <div className='flex flex-col w-full max-w-120 min-h-screen p-4'>

                        <div className='flex flex-col'>
                            {
                                orders.map((order: any) => {
                                    const completedTasks = order.tasks.filter((task: any) => task.status == 4).length;
                                    const totalTasks = order.tasks.length;
                                    const progressPercentage = (completedTasks / totalTasks) * 100;
                                    return (

                                        <div key={order.id} className='flex flex-col bg-white p-4 mb-4 rounded-xl shadow-sm border-l-[6px] border-l-[#137fec] active:bg-gray-200 transition-all duration-300 select-none'>

                                            <span className='font-bold'>
                                                {order.ordersType.name}
                                            </span>

                                            <span className='flex flex-row text-sm text-gray-500 items-center gap-1'>
                                                {locationDotIcon} {order.branch.name}
                                            </span>

                                            <div className='flex flex-col'>
                                                <div className='flex justify-between items-center mt-2 mb-1'>
                                                    <span className='text-sm text-gray-500'>
                                                        Progreso de tareas
                                                    </span>
                                                    <span className='text-sm font-bold'>
                                                        {completedTasks}/{totalTasks} Completed
                                                    </span>
                                                </div>
                                                <div className="w-full bg-slate-100  h-1.5 rounded-full overflow-hidden">
                                                    <div
                                                        className="bg-[#137fec] h-full rounded-full transition-all duration-300"
                                                        style={{
                                                            width: `${progressPercentage}%`
                                                        }}
                                                    ></div>
                                                </div>

                                            </div>



                                        </div>
                                    )
                                })
                            }
                        </div>


                    </div>
                    :
                    <p>No se encontraron órdenes para este usuario.</p>

            }

        </>
    )
}