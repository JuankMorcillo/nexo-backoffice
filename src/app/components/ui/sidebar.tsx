'use client';

import { usePathname, useRouter } from 'next/navigation';
import { toggleSidebar, selectSidebarExpanded } from '../../store/slices/uiSlice'

import Iconos from './hooks/iconos'
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Sidebar() {

    const { data: session } = useSession()

    const [subMenu, setSubMenu] = useState('')

    const [expandedSubMenu, setExpandedSubMenu] = useState(false)

    const { clientsIcon, homeIcon, hammerIcon } = Iconos({ fill: 'currentColor', classNames: 'size-6', stroke: 'currentColor', strokeWidth: 1.5 })

    const { boxOpenIcon } = Iconos({ fill: 'currentColor', classNames: 'size-15', stroke: 'currentColor', strokeWidth: 1.5 })

    const router = useRouter()

    const pathname = usePathname()

    const dispatch = useDispatch()

    const expanded = useSelector(selectSidebarExpanded)

    const toggleExpand = () => {
        dispatch(toggleSidebar())
    }

    const toggleSubmenu = (itemName: string) => {
        if (!expanded) return

        setSubMenu(subMenu === itemName ? '' : itemName)
    }

    const navigateTo = (href: string) => {
        router.push(href);
    }

    const SIDEBAROPTION = [
        {
            id: 'dashboard',
            name: 'Dashboard',
            href: '/',
            icon: homeIcon
        },
        {
            id: 'clients',
            name: 'Clientes',
            href: '/clients',
            icon: clientsIcon,
            options: [
                {
                    id: 'branches',
                    name: 'Sucursales',
                    href: '/branches',
                }
            ]
        },
        {
            id: 'equipments',
            name: 'Equipos',
            href: '/equipments',
            icon: hammerIcon
        }
    ]

    return (
        <>
            {session &&
                <aside className={`fixed flex flex-col bg-linear-to-br from-slate-700 to-slate-800
            transition-all duration-500 ease-in-out will-change-transform lg:translate-x-0
            shadow-md h-screen
        ${expanded ? 'w-48' : 'w-23'}
        `}>

                    <div className='h-14 flex items-center justify-center text-white mb-4 mt-2'>
                        {boxOpenIcon}
                    </div>

                    <div className='flex flex-col'>
                        {SIDEBAROPTION.map((option) => (
                            <div className='w-full' key={option.id}>


                                <div key={`${option.id}-item`} className={`flex items-center border-b px-4 py-3 cursor-pointer transition-all duration-300   
                                ${pathname === option.href ? 'text-slate-700 bg-gray-100' : 'text-white border-gray-200'}                  
                                hover:text-slate-700 hover:bg-gray-100                   
                                `}>
                                    <div className="shrink-0 transition-all duration-300 ease-in-out"
                                        style={{
                                            transform: expanded ? 'translateX(0)' : 'translateX(1rem)',
                                        }}
                                    >
                                        {option.icon}
                                    </div>
                                    <span onClick={() => navigateTo(option.href)} className={`ml-3 transition-all duration-300 whitespace-nowrap opacity-100 ease-in-out font-bold`}
                                        style={{
                                            opacity: expanded ? 1 : 0,
                                            width: expanded ? 'auto' : 0,
                                        }}
                                    >
                                        {option.name}
                                    </span>

                                    {
                                        option.options && expanded && (
                                            <div className='shrink-0'
                                                onClick={() => toggleSubmenu(option.name)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill='currentColor'
                                                    className={`size-6 transition-transform duration-500 ease-in-out ${subMenu === option.name ? 'rotate-180' : 'rotate-0'}`}>
                                                    <path d="M297.4 438.6C309.9 451.1 330.2 451.1 342.7 438.6L502.7 278.6C515.2 266.1 515.2 245.8 502.7 233.3C490.2 220.8 469.9 220.8 457.4 233.3L320 370.7L182.6 233.4C170.1 220.9 149.8 220.9 137.3 233.4C124.8 245.9 124.8 266.2 137.3 278.7L297.3 438.7z" />
                                                </svg>
                                            </div>
                                        )
                                    }
                                </div>

                                {
                                    option.options && subMenu === option.name && (
                                        <div className="ml-6 mt-1 space-y-1 transition-all duration-300 ease-in-out">
                                            {option.options.map((option) => (
                                                <div
                                                    key={option.id}
                                                    onClick={() => navigateTo(option.href)}
                                                    className={`flex items-center px-3 py-2 text-sm rounded-md cursor-pointer transition-all duration-200
                                                            ${pathname === option.href
                                                            ? 'text-slate-700 bg-gray-100'
                                                            : 'text-white hover:text-slate-700 hover:bg-gray-100'
                                                        }
                                                        `}
                                                >
                                                    <span className="whitespace-nowrap" key={option.href}>{option.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )
                                }
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

                </aside >}
        </>
    )
}