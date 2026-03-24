import React from 'react'
import Iconos from './hooks/iconos'

export default function MovilHeader() {

    const { helmetIcon } = Iconos({ fill: 'currentColor', classNames: 'size-6', stroke: 'currentColor', strokeWidth: 1.5 })

    const { bellIcon, searchIcon } = Iconos({ fill: 'currentColor', classNames: 'size-5', stroke: 'currentColor', strokeWidth: 1.5 })

    return (
        <div className='h-14 border-b border-gray-200 shadow-md w-full flex items-center transition-all duration-500 ease-in-out justify-between bg-linear-to-br bg-white'>
            <div className='flex justify-between p-2 w-full'>

                <div className='flex gap-2'>

                    <div className='flex items-center justify-center bg-blue-500 text-white rounded-lg p-2'>
                        {helmetIcon}
                    </div>

                    <div className='flex flex-col'>
                        <span className='text-sm font-bold'>
                            Ordenes asignadas
                        </span>
                        <span className='text-xs text-gray-500'>
                            Técnico { }
                        </span>
                    </div>

                </div>

                <div className='flex gap-4 p-2'>
                    <button className='text-sm text-gray-500'>
                        {searchIcon}
                    </button>
                    <button className='text-sm text-gray-500'>
                        {bellIcon}
                    </button>
                </div>

            </div>
        </div>
    )
}