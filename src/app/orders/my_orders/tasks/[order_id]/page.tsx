'use client';

import Iconos from '@/src/app/components/ui/hooks/iconos';
import { AppDispatch } from '@/src/app/store'
import { fetchTasksUser } from '@/src/app/store/slices/ordersSlice'
import { dateFormatter } from '@/src/lib/utils/dateFormatter';
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function page() {

  const dispatch = useDispatch<AppDispatch>()
  const { data: session } = useSession()

  const [tasks, setTasks] = useState([])
  const [form_id, setForm_Id] = useState(0)

  const { circleIcon, circleCheckIcon } = Iconos({ classNames: 'size-6', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })

  const { doubleCheckIcon } = Iconos({ classNames: 'size-6', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 1.5 })

  const { order_id } = useParams()

  const router = useRouter();

  const handleNavigateToOrder = (task_id: number, orderId: number, form_id: number) => {
    router.push(`/orders/my_orders/tasks/${orderId}/close_task/${task_id}/form/${form_id}`);
  }

  const fetchTasks = async () => {
    if (session?.user?.access_token) {

      try {

        const response = await dispatch(
          fetchTasksUser({ token: session.user.access_token, order_id: Number(order_id) })
        )

        if (response.type == 'orders/fetchTasksUser/fulfilled') {
          setTasks(response.payload.tasks)
          setForm_Id(response.payload.ordersType.forms.id)
        }

      } catch (error) {
        console.error('Error fetching orders:', error);
      }

    }
  }

  useEffect(() => {
    fetchTasks()
  }, [session])


  return (
    <div className='flex flex-col w-full max-w-120 min-h-screen p-4'>
      <div className='flex flex-col'>
        {
          tasks && tasks.length > 0 ?

            tasks.map((task: any) => {
              return (
                <div key={`task-${task.id}`} className='flex flex-col gap-4 bg-white p-4 mb-4 rounded-xl shadow-sm select-none'>
                  <div className='flex'>

                    <div className='flex items-center'>
                      <span style={{
                        color: task.status == 4 ? 'oklch(69.6% 0.17 162.48)' : 'oklch(86.9% 0.022 252.894)'
                      }}>
                        {
                          task.status == 4 ? circleCheckIcon : circleIcon
                        }
                      </span>
                    </div>

                    <div className='flex flex-col ml-4'>
                      <span className='font-bold text-lg'>
                        {task.equipment.serial}
                      </span>
                      <span>
                        {task.description}
                      </span>
                    </div>

                  </div>

                  <div>
                    {
                      task.status == 4 ?
                        <span className='flex gap-2 items-center text-emerald-400 text-sm'>
                          {doubleCheckIcon} Finalizada: {dateFormatter(task.end_date)}
                        </span>
                        :
                        <button className="w-full bg-blue-500 active:bg-blue-400 text-white font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                          onClick={() => { handleNavigateToOrder(Number(task.id), Number(order_id), form_id) }}
                        >
                          {circleCheckIcon}
                          Cerrar Tarea
                        </button>
                    }
                  </div>

                </div>
              )
            })

            :
            <>
            </>
        }
      </div>
    </div>
  )
}