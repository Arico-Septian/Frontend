'use client';

import { FaRegEnvelope, FaAddressCard, FaAddressBook } from 'react-icons/fa'
import { MdLockOutline, MdAccessibility, MdAddCall } from 'react-icons/md'
import { useState } from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [nomor_handphone, setNomor_handphone] = useState('');
    const [nama_bank, setNama_bank] = useState('');
    const [nomor_rekening, setNomor_rekening] = useState('');
    const [role, setRole] = useState('pengguna');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, { username, password, email, nomor_handphone, nama_bank, nomor_rekening, role });

            if (response.status === 200 || response.status === 201) {
                router.push('/login');
            } else {
                console.error('Register failed');
            }
        } catch (error) {
            console.error('An error occurred during register:', error);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-r">
            <head>
                <title> Register </title>
            </head>

            <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-gradient-to-r  from-blue-300 via-yellow-500 to-blue-300">
                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-2xl shadow-2xl flex w-3/3 max-w-4xl">
                        <div className="w-3/5 p-5">
                            <div className="text-left font-bold">
                                <span className="text-yellow-500"> Logo </span>
                            </div>
                            <div className="py-10">
                                <h2 className="text-3xl font-bold text-yellow-500 mb-2">
                                    Sign up to Account
                                </h2>
                                <p className='text-gray-400 my-3'>create your new account</p>
                                <div className='flex flex-col items-center'>
                                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                                        <MdAccessibility className="text-gray-400" />
                                        <input type="username" name="username" onChange={(e) => setUsername(e.target.value)} placeholder='Username' className='bg-gray-100 outline-none text-sm felx-1' />
                                    </div>
                                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                                        <MdLockOutline className="text-gray-400" />
                                        <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder='••••••••' className='bg-gray-100 outline-none text-sm felx-1' />
                                    </div>
                                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                                        <FaRegEnvelope className="text-gray-400" />
                                        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='bg-gray-100 outline-none text-sm felx-1' />
                                    </div>
                                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                                        <MdAddCall className="text-gray-400" />
                                        <input type="nomor_handphone" name="nomor handphone" onChange={(e) => setNomor_handphone(e.target.value)} placeholder='Nomor handphone' className='bg-gray-100 outline-none text-sm felx-1' />
                                    </div>
                                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                                        <FaAddressCard className="text-gray-400" />
                                        <input type="nama_bank" name="nama bank" onChange={(e) => setNama_bank(e.target.value)} placeholder='Nama bank' className='bg-gray-100 outline-none text-sm felx-1' />
                                    </div>
                                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                                        <FaAddressBook className="text-gray-400" />
                                        <input type="nomor_rekening" name="nomor rekening" onChange={(e) => setNomor_rekening(e.target.value)} placeholder='Nomor bank' className='bg-gray-100 outline-none text-sm felx-1' />
                                    </div>
                                    <div className='flex justify-between w-64 mb-5'>
                                        <label className='flex items-center text-xs'>
                                            <input type="checkbox" name='remember me' className='mr-1' />I agree to the</label>
                                        <a href="#" className='text-xs'>Privacy Policy?</a>
                                    </div>
                                    <button className="border-2 border-yellow-500 text-yellow-500 
                                rounded-full px-12 py-2 inline-block font-semibold
                                 hover:bg-yellow-500  hover:text-white">
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-2/5 bg-yellow-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
                            <h2 className="text-3xl font-bold mb-2 pt-20"> Hello, Friend </h2>
                            <div className="border-2 w-10 border-white inline-block mb-2"></div>
                            <p className="mb-5">
                                If you already have an account, please
                            </p>
                            <button
                                className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white
                         hover:text-yellow-500">
                                <a href="/login">
                                    Sign In
                                </a>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
};