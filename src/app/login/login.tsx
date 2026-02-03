'use client';

import { signIn } from 'next-auth/react';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

// <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.-->
const ICON = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="size-6 animate-spin" fill='currentColor'>
    <path d="M129.9 292.5C143.2 199.5 223.3 128 320 128C373 128 421 149.5 455.8 184.2C456 184.4 456.2 184.6 456.4 184.8L464 192L416.1 192C398.4 192 384.1 206.3 384.1 224C384.1 241.7 398.4 256 416.1 256L544.1 256C561.8 256 576.1 241.7 576.1 224L576.1 96C576.1 78.3 561.8 64 544.1 64C526.4 64 512.1 78.3 512.1 96L512.1 149.4L500.8 138.7C454.5 92.6 390.5 64 320 64C191 64 84.3 159.4 66.6 283.5C64.1 301 76.2 317.2 93.7 319.7C111.2 322.2 127.4 310 129.9 292.6zM573.4 356.5C575.9 339 563.7 322.8 546.3 320.3C528.9 317.8 512.6 330 510.1 347.4C496.8 440.4 416.7 511.9 320 511.9C267 511.9 219 490.4 184.2 455.7C184 455.5 183.8 455.3 183.6 455.1L176 447.9L223.9 447.9C241.6 447.9 255.9 433.6 255.9 415.9C255.9 398.2 241.6 383.9 223.9 383.9L96 384C87.5 384 79.3 387.4 73.3 393.5C67.3 399.6 63.9 407.7 64 416.3L65 543.3C65.1 561 79.6 575.2 97.3 575C115 574.8 129.2 560.4 129 542.7L128.6 491.2L139.3 501.3C185.6 547.4 249.5 576 320 576C449 576 555.7 480.6 573.4 356.5z" />
</svg>

const LOCKICON = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className='size-10' fill='currentColor'>
    <path d="M256 160C256 124.7 284.7 96 320 96C351.7 96 378 119 383.1 149.3C386 166.7 402.5 178.5 420 175.6C437.5 172.7 449.2 156.2 446.3 138.7C436.1 78.1 383.5 32 320 32C249.3 32 192 89.3 192 160L192 224C156.7 224 128 252.7 128 288L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 288C512 252.7 483.3 224 448 224L256 224L256 160z" />
</svg>

const EYECON = [
    //open
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="size-6">
        <path d="M320 96C239.2 96 174.5 132.8 127.4 176.6C80.6 220.1 49.3 272 34.4 307.7C31.1 315.6 31.1 324.4 34.4 332.3C49.3 368 80.6 420 127.4 463.4C174.5 507.1 239.2 544 320 544C400.8 544 465.5 507.2 512.6 463.4C559.4 419.9 590.7 368 605.6 332.3C608.9 324.4 608.9 315.6 605.6 307.7C590.7 272 559.4 220 512.6 176.6C465.5 132.9 400.8 96 320 96zM176 320C176 240.5 240.5 176 320 176C399.5 176 464 240.5 464 320C464 399.5 399.5 464 320 464C240.5 464 176 399.5 176 320zM320 256C320 291.3 291.3 320 256 320C244.5 320 233.7 317 224.3 311.6C223.3 322.5 224.2 333.7 227.2 344.8C240.9 396 293.6 426.4 344.8 412.7C396 399 426.4 346.3 412.7 295.1C400.5 249.4 357.2 220.3 311.6 224.3C316.9 233.6 320 244.4 320 256z" />
    </svg>,
    //closed
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="size-6">
        <path d="M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L504.5 470.8C507.2 468.4 509.9 466 512.5 463.6C559.3 420.1 590.6 368.2 605.5 332.5C608.8 324.6 608.8 315.8 605.5 307.9C590.6 272.2 559.3 220.2 512.5 176.8C465.4 133.1 400.7 96.2 319.9 96.2C263.1 96.2 214.3 114.4 173.9 140.4L73 39.1zM236.5 202.7C260 185.9 288.9 176 320 176C399.5 176 464 240.5 464 320C464 351.1 454.1 379.9 437.3 403.5L402.6 368.8C415.3 347.4 419.6 321.1 412.7 295.1C399 243.9 346.3 213.5 295.1 227.2C286.5 229.5 278.4 232.9 271.1 237.2L236.4 202.5zM357.3 459.1C345.4 462.3 332.9 464 320 464C240.5 464 176 399.5 176 320C176 307.1 177.7 294.6 180.9 282.7L101.4 203.2C68.8 240 46.4 279 34.5 307.7C31.2 315.6 31.2 324.4 34.5 332.3C49.4 368 80.7 420 127.5 463.4C174.6 507.1 239.3 544 320.1 544C357.4 544 391.3 536.1 421.6 523.4L357.4 459.2z" />
    </svg>

]

export default function Login() {

    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

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
        <div className='flex flex-col items-center justify-center w-110 rounded-2xl shadow-2xl bg-white'>

            <form className="p-8 w-full max-w-md">

                <div className='flex justify-center'>
                    <div className='mb-4 text-blue-500 rounded-full bg-blue-100 p-4'>
                        {LOCKICON}
                    </div>
                </div>

                <div className='flex flex-col items-center mb-8 text-center'>
                    <h1 className="flex justify-center text-2xl font-bold mb-4 text-black">
                        Welcome Back
                    </h1>

                    <div className="text-gray-500 font-bold">
                        Enter your credentials to access your portal
                    </div>

                </div>

                <div className="mb-4 text-black">
                    <div>
                        <label className="block mb-2 font-bold text-sm">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            placeholder='name@company.com'
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md mb-4 hover:border-gray-400 transition-colors"
                        />
                    </div>
                    <div className='flex flex-col '>
                        <label className="block mb-2 font-bold text-sm">Password</label>
                        <div className='flex w-full items-stretch rounded-md mb-4'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                placeholder='********'
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-l-md border-r-0 hover:border-gray-400 transition-colors"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className='flex items-center justify-center px-3 bg-gray-200 border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-300 transition-colors'
                            >
                                {showPassword ? EYECON[1] : EYECON[0]}
                            </button>
                        </div>
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
                        className="w-full bg-blue-500 text-white p-2 text-md font-bold rounded-md hover:bg-blue-600 transition-colors"
                    >
                        {isLoading ?
                            <div className='flex items-center justify-center gap-2'>
                                {ICON}
                                Logging in...
                            </div>
                            : 'Sign In to Dashboard'}
                    </button>
                </div>

            </form>

        </div>
    )
}