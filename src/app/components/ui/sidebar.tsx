'use client';

import { toggleSidebar, selectSidebarExpanded } from '../../store/slices/uiSlice'

import Iconos from './hooks/iconos'
import { useDispatch, useSelector } from 'react-redux';


export default function Sidebar() {

    const { clientsIcon, homeIcon } = Iconos({ fill: 'currentColor', classNames: 'size-5', stroke: 'currentColor', strokeWidth: 1.5 })

    const { circleArrowLeftIcon, circleArrowRightIcon } = Iconos({ fill: 'currentColor', classNames: 'size-6 rotate-180', stroke: 'currentColor', strokeWidth: 1.5 })

    const dispatch = useDispatch()

    const expanded = useSelector(selectSidebarExpanded)

    const toggleExpand = () => {
        dispatch(toggleSidebar())
    }

    const SIDEBAROPTION = [
        {
            name: 'Dashboard',
            href: '/dashboard',
            icon: homeIcon
        },
        {
            name: 'Clientes',
            href: '/clientes',
            icon: clientsIcon
        }
    ]

    return (
        <aside className={`flex flex-col bg-linear-to-br from-blue-600 via-blue-400 to-cyan-300 
            transition-all duration-300 ease-in-out will-change-transform lg:translate-x-0
            shadow-md
        ${expanded ? 'w-48' : 'w-23'}
        `}>

            <div className='h-14 flex items-center justify-center border-b border-gray-200 mb-4'>
            </div>

            <div className='flex flex-col'>
                {SIDEBAROPTION.map((option) => (
                    <div key={option.name} className='flex flex-1 flex-row items-center justify-center gap-1 border-b border-gray-200'>
                        <div className="shrink-0 text-white">
                            {option.icon}
                        </div>
                        <span className={`ml-3 transition-all text-white duration-300 whitespace-nowrap opacity-100`}>
                            {option.name}
                        </span>
                    </div>
                ))}
            </div>

            <div className='mt-auto mb-6 flex justify-center cursor-pointer text-white'>
                <button onClick={() => toggleExpand()} className='flex w-full justify-end px-4 py-2 border-b border-white cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill='currentColor'
                        className={`size-6 transition-transform duration-500 ease-in-out
                        ${expanded ? 'rotate-180' : 'rotate-0'}
                        `}
                        stroke='currentColor' strokeWidth={1.5}>
                        <path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM199 303L279 223C288.4 213.6 303.6 213.6 312.9 223C322.2 232.4 322.3 247.6 312.9 256.9L273.9 295.9L424 295.9C437.3 295.9 448 306.6 448 319.9C448 333.2 437.3 343.9 424 343.9L273.9 343.9L312.9 382.9C322.3 392.3 322.3 407.5 312.9 416.8C303.5 426.1 288.3 426.2 279 416.8L199 336.8C189.6 327.4 189.6 312.2 199 302.9z" />
                    </svg>
                </button>
            </div>

        </aside >
    )
}