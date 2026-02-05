import React from 'react'

type ModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    title?: any;
    children?: React.ReactNode;
    classNames?: string;
    position?: string;
    x_icon?: boolean;
}

//<!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
const XICON = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="size-6">
    <path d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z" />
</svg>

export default function Modal({ open, setOpen, title, children, position, classNames, x_icon }: ModalProps) {
    return (
        <>
            {open && (
                <div className={`fixed ${position ? position : 'inset-0 z-50'} flex items-center justify-center animate-fade-in ${classNames ? classNames : ''}`}>
                    <div className='bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6'>
                        {title || x_icon &&<div className='flex justify-between items-center mb-4'>
                            {
                                title && <div className='font-bold text-lg'>{title}</div>
                            }
                            {
                                x_icon && <button onClick={() => setOpen(false)}>{XICON}</button>
                            }
                        </div>}
                        <div>
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}