import React from 'react'

type Props = {
    children: React.ReactNode
}

export default function layout({ children }: Props) {

    return (
        <div className='flex items-center justify-center min-h-screen'>
            {children}
        </div>
    )
}