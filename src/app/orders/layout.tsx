'use client';

import React from 'react'
import { useSelector } from 'react-redux';
import { selectMainContentMargin, selectSidebarExpanded } from '../store/slices/uiSlice';

type Props = {
    children: React.ReactNode
}

export default function layout({ children }: Props) {

    const expanded = useSelector(selectSidebarExpanded)

    const mainContentMargin = useSelector(selectMainContentMargin)

    return (
        <div className={`flex transition-all duration-500 ease-in-out ${mainContentMargin} p-4 min-h-screen items-center`}>
            {children}
        </div>
    )
}