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

            console.log(result);
            

            if (result?.error) {
                setError('Invalid credentials');
                setIsLoading(false);
            } else {
                // router.push(`/dashboard`);
                // router.refresh();
            }
        } catch (error) {
            console.log(error);

            setError('An error occurred during sign in');
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

            <h1 className="text-4xl font-bold mb-8 text-black">Login</h1>

            <form className="bg-white p-6 rounded shadow-md w-full max-w-sm">

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="mb-4 text-black">
                    <div>
                        <label className="block mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>

            </form>

        </div>
    )
}