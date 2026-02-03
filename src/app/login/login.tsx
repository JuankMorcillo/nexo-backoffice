'use client';

import { signIn } from 'next-auth/react';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

export default function Login() {

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false
            });

            if (result?.error) {
                setError('Invalid credentials');
                setIsLoading(false);
            } else {
                router.push(`/`);
            }
        } catch (error) {
            console.log(error);
            setError('An error occurred during sign in');
            setIsLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center w-250'>


            <form className="p-6 rounded shadow-2xl w-full max-w-md">

                <h1 className="flex justify-center text-4xl mb-8 text-black">
                    Login
                </h1>

                <div className="mb-4 text-black">
                    <div>
                        <label className="block mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-4 hover:border-gray-400 transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-4 hover:border-gray-400 transition-colors"
                        />
                    </div>
                </div>

                <div className='flex justify-center'>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                </div>


                <div className='flex justify-center mb-2'>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full max-w-3xs bg-blue-500 text-white p-2 text-xl rounded hover:bg-blue-600 transition-colors"
                    >
                        {isLoading ?
                            <div className='flex items-center justify-center gap-2'>
                                {
                                    // <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
                                }
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="size-6 animate-spin" fill='currentColor'>
                                    <path d="M129.9 292.5C143.2 199.5 223.3 128 320 128C373 128 421 149.5 455.8 184.2C456 184.4 456.2 184.6 456.4 184.8L464 192L416.1 192C398.4 192 384.1 206.3 384.1 224C384.1 241.7 398.4 256 416.1 256L544.1 256C561.8 256 576.1 241.7 576.1 224L576.1 96C576.1 78.3 561.8 64 544.1 64C526.4 64 512.1 78.3 512.1 96L512.1 149.4L500.8 138.7C454.5 92.6 390.5 64 320 64C191 64 84.3 159.4 66.6 283.5C64.1 301 76.2 317.2 93.7 319.7C111.2 322.2 127.4 310 129.9 292.6zM573.4 356.5C575.9 339 563.7 322.8 546.3 320.3C528.9 317.8 512.6 330 510.1 347.4C496.8 440.4 416.7 511.9 320 511.9C267 511.9 219 490.4 184.2 455.7C184 455.5 183.8 455.3 183.6 455.1L176 447.9L223.9 447.9C241.6 447.9 255.9 433.6 255.9 415.9C255.9 398.2 241.6 383.9 223.9 383.9L96 384C87.5 384 79.3 387.4 73.3 393.5C67.3 399.6 63.9 407.7 64 416.3L65 543.3C65.1 561 79.6 575.2 97.3 575C115 574.8 129.2 560.4 129 542.7L128.6 491.2L139.3 501.3C185.6 547.4 249.5 576 320 576C449 576 555.7 480.6 573.4 356.5z" />
                                </svg>
                                Logging in...
                            </div>
                            : 'Sign In'}
                    </button>
                </div>

            </form>

        </div>
    )
}