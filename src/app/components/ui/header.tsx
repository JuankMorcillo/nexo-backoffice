'use client';

import useUserInitials from '@/src/hooks/useUserInitials';
import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react'
import Modal from '../modal';

const LOGOUTICON = {
    'name': 'logout',
    'icon': <svg xmlns="http://www.w3.org/2000/svg" fill='none' viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
    </svg>
}

export default function Header() {

    const { data: session } = useSession()
    const { color, initials } = useUserInitials({ name: session?.user.user.name || '', lastName: session?.user.user.last_name })
    const [open, setOpen] = useState(false)

    const handleLogout = () => {
        signOut({ redirect: true, callbackUrl: '/login' });
    };

    return (
        <div className='h-14 border-gray-200 shadow-md w-full flex items-center justify-between px-6 py-4 bg-linear-to-br from-blue-600 via-blue-400 to-cyan-300'>

            <div className='ml-4 text-white font-bold text-lg'>
                Nexo Backoffice
            </div>

            <div className='flex items-center mr-4'>
                <button
                    className="w-10 h-10 cursor-pointer rounded-full text-white font-bold text-lg shadow"
                    style={{ backgroundColor: color }}
                    onClick={() => setOpen(!open)}
                >
                    {initials}
                </button>
            </div>

            <Modal
                open={open}
                setOpen={setOpen}
                children={
                    <button className='flex items-center justify-center w-full bg-red-500 text-white rounded p-2 cursor-pointer' onClick={handleLogout}>
                        {LOGOUTICON.icon} Cerrar sesión 
                    </button>
                }
                classNames='w-50'
                position='right-1 z-50 top-14 h-auto'
            />

        </div>
    )
}