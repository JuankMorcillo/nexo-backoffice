'use client';

import React, { useEffect } from 'react'
import toast, { Toaster, ToastPosition } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { clearToastInfo, selectToastInfo } from '../../store/slices/toastSlice';


export default function Toast() {

    const { id, message, position, icon, duration } = useSelector(selectToastInfo)

    const dispatch = useDispatch()

    useEffect(() => {

        if (message) {
            toast(message, {
                id: id as string,
                position: position as ToastPosition,
                icon: icon,
                duration: duration || 3000,
            });
            dispatch(clearToastInfo())
        }

    }, [message])


    return (
        <>
            <Toaster />
        </>
    )
}