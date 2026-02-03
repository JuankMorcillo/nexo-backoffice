import React from 'react'
import Login from './login'

export default function page() {
    return (
        <div className='flex flex-col items-center w-full min-h-screen'>
            <div className='flex items-center justify-center flex-1 w-full bg-linear-to-br from-blue-600 via-blue-400 to-cyan-300 animate-gradient-shift'>
                <Login />
            </div>
        </div>
    )
}