'use client';

import { FaRegEnvelope } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, { username, password });

            if (response.status === 200 || response.status === 201) {
                const token = response.data.access_token;
                localStorage.setItem('token', token);
                console.log('Login successful');
                router.push('/homepagelogin');
            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen py-2">
            <head>
                <title> Login </title>
            </head>

            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-gradient-to-r from-blue-300 via-yellow-500 to-blue-300">
                <div className="bg-white rounded-2xl shadow-2xl flex w-3/3 max-w-4xl">
                    <div className="w-3/5 p-5">
                        <div className="text-left font-bold">
                            <span className="text-yellow-500"> Logo </span>
                        </div>
                        <div className="py-20">
                            <h2 className="text-3xl font-bold text-yellow-500 mb-2">
                                Sign in to Account
                            </h2>
                            <p className='text-gray-400 my-3'>use your email account</p>
                            <div className='flex flex-col items-center'>
                                <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                                    <FaRegEnvelope className="text-gray-400" />
                                    <input type="text" name="username" onChange={(e) => setUsername(e.target.value)} placeholder='Username' className='bg-gray-100 outline-none text-sm felx-1' />
                                </div>
                                <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                                    <MdLockOutline className="text-gray-400" />
                                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder='••••••••' className='bg-gray-100 outline-none text-sm felx-1' />
                                </div>
                                <div className='flex justify-between w-64 mb-5'>
                                    <label className='flex items-center text-xs'>
                                        <input type="checkbox" name='remember me' className='mr-1' />Remember me</label>
                                    <a href="#" className='text-xs'>Forget Password?</a>
                                </div>
                                <button className="border-2 border-yellow-500 text-yellow-500 
                                    rounded-full px-12 py-2 inline-block font-semibold
                                    hover:bg-yellow-500  hover:text-white">
                                    Sign In
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-2/5 bg-yellow-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
                        <h2 className="text-3xl font-bold mb-2"> Hello, Friend </h2>
                        <div className="border-2 w-10 border-white inline-block mb-2"></div>
                        <p className="mb-5">
                            If you don't have an account, please
                        </p>
                        <button
                            className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white
                         hover:text-yellow-500">
                            <a href="/register">
                                Sign Up
                            </a>
                        </button>
                    </div>
                </div>
            </form>
        </main>
    )
}