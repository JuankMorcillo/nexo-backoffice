'use client';

import useUserInitials from '@/src/hooks/useUserInitials';
import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react'
import Modal from '../modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectSidebarExpanded } from '../../store/slices/uiSlice';

const LOGOUTICON = {
    'name': 'logout',
    'icon': <svg xmlns="http://www.w3.org/2000/svg" fill='none' viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
    </svg>
}

//<!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
const USERICON = <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' viewBox="0 0 640 640" strokeWidth={1.5} stroke="currentColor" className="size-5">
    <path d="M240 192C240 147.8 275.8 112 320 112C364.2 112 400 147.8 400 192C400 236.2 364.2 272 320 272C275.8 272 240 236.2 240 192zM448 192C448 121.3 390.7 64 320 64C249.3 64 192 121.3 192 192C192 262.7 249.3 320 320 320C390.7 320 448 262.7 448 192zM144 544C144 473.3 201.3 416 272 416L368 416C438.7 416 496 473.3 496 544L496 552C496 565.3 506.7 576 520 576C533.3 576 544 565.3 544 552L544 544C544 446.8 465.2 368 368 368L272 368C174.8 368 96 446.8 96 544L96 552C96 565.3 106.7 576 120 576C133.3 576 144 565.3 144 552L144 544z" />
</svg>

export default function Header() {

    const { data: session } = useSession()
    const { color, initials } = useUserInitials({ name: session?.user.user.name || '', lastName: session?.user.user.last_name })
    const [open, setOpen] = useState(false)

    const dispatch = useDispatch()

    const expanded = useSelector(selectSidebarExpanded)

    const mainContentMargin = expanded
        ? "lg:ml-[255px]"
        : "lg:ml-[92px]";

    const headerWidth = expanded
        ? "lg:w-[calc(100%-255px)]"
        : "lg:w-[calc(100%-74px)]";


    const handleLogout = () => {
        signOut({ redirect: true, callbackUrl: '/login' });
    };

    return (
        <>
            {session && <div className={`h-14 border-b border-gray-200 shadow-md w-full flex items-center 
            transition-all duration-500 ease-in-out
        justify-between px-6 py-4 bg-linear-to-br bg-white
        ${mainContentMargin} ${headerWidth}`}>

                <div className='ml-4 text-black font-bold text-lg'>
                    Bienvenido de nuevo, {session?.user.user.name}!
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
                        <div className='flex flex-col gap-2'>
                            <div className='flex justify-center border-b border-gray-200 cursor-default'>
                                <span className='font-bold'>{session?.user.user.name} {session?.user.user.last_name}</span>
                            </div>
                            <div className='flex flex-row justify-center 
                        gap-2 mb-2 border-b border-gray-200 text-gray-500 cursor-pointer
                        hover:bg-gray-300 rounded transition-colors duration-300 
                        '>
                                {USERICON} <span className='font-semibold'>Perfil</span>
                            </div>
                            <button className='flex items-center justify-center w-full bg-red-500 
                        text-white rounded p-2 cursor-pointer'
                                onClick={handleLogout}
                            >
                                {LOGOUTICON.icon} Cerrar sesión
                            </button>
                        </div>
                    }
                    classNames='w-50'
                    position='right-1 z-50 top-14 h-auto'
                />

            </div>}
        </>
    )
}