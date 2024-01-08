'use client';

import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function OrderPage() {

    const [berat_pakaian, setBeratPakaian] = useState(0);
    const [jumlah_pakaian, setJumlahPakaian] = useState('');
    const [kategori_laundry, setKategoriLaundry] = useState('');
    const [metode_pembayaran, setMetodePembayaran] = useState('');
    const [jumlah_pembayaran, setJumlahPembayaran] = useState('');
    const jwt = require('jsonwebtoken');
    const router = useRouter();
    let userId = ''

    const jwtString = localStorage.getItem('token');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (jwtString) {
                const decoded: any = jwt.decode(jwtString);

                userId = decoded.sub;
                const username: string = decoded.username;
            }
        } catch (error: any) {
            console.error('JWT verification failed:', error.message);
        }

        const axiosConfig = {
            headers: {
                'Authorization': `Bearer ${jwtString}`,
                'Content-Type': 'application/json',
            },
        };

        try {
            let jumlah: number = berat_pakaian * 13000
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/order/create`, { jumlah_pakaian, berat_pakaian, kategori_laundry, metode_pembayaran, userid: userId, jumlah_pembayaran: jumlah }, axiosConfig);

            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    title: 'Order Success',
                    text: `Terimakasih Telah Melakukan Order, jumlah pembayaran andalah sejumlah ${jumlah}`,
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                router.push('/homepagelogin');
            } else {
                console.error('Create failed');
            }
        } catch (error) {
            console.error('An error occurred during Create:', error);
        }
    };

    return (
        <main className='bg-gradient-to-r from-blue-300 via-yellow-500 to-blue-300 bg-cover w-full min-h-screen'>
            <form onSubmit={handleSubmit}>
                <head>
                    <title> Order </title>
                </head>

                <nav className=" flex justify-center h-[150px]">
                    <div className="w-[1240px] flex items-center justify-between">
                        <div className="flex items-center w-[577px] justify-between">
                            <div className="flex w-[340px] justify-between">
                                <a href='/homepagelogin' className='font-semibold'>
                                    Home
                                </a>
                            </div>
                        </div>
                        <div className="w-[320px] flex justify-between">
                            <button className="bg-blue-200 px-[28px] py-[10px] rounded-[47px] inline-flex">
                                <FaPlus className="pt-1" />
                                <a href="/order">
                                    Add Order
                                </a>
                            </button>
                            <button className="bg-blue-200 px-[36px] py-[10px] rounded-[47px]">
                                <a href="/">
                                    Logout
                                </a>
                            </button>
                        </div>
                    </div>
                </nav>

                <div className="flex items-center h-[400px] justify-center w-full flex-1 px-20 text-center bg-gradient-to-r from-blue-300 via-yellow-500 to-blue-300">
                    <div className="bg-gradient-to-r from-blue-200 via-yellow-300 to-blue-200 rounded-2xl shadow-2xl flex w-2/3 max-w-4xl items-center justify-center">
                        <div className="w-3/5 p-5">
                            <div className="flex flex-col">
                                <label className="block text-sm font-medium">Pilih Kategori Laundry</label>
                                <div className="relative mt-1">
                                    <select id="mySelect" onChange={(e) => setKategoriLaundry(e.target.value)} name="mySelect" aria-label="Choose an option"
                                        className="block w-full py-2 px-3 rounded-md shadow-sm">
                                        <option value="cuci basah">Cuci Basah</option>
                                        <option value="cuci kering">Cuci Kering</option>
                                        <option value="cuci setrika">Cuci Setrika</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="quantity" className="block text-sm font-medium">
                                    Jumlah Pakaian
                                </label>
                                <input onChange={(e) => setJumlahPakaian(e.target.value)}
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    className="mt-1 p-2 w-full border rounded"
                                />
                                <div className="mb-4">
                                    <label htmlFor="weight" className="block text-sm font-medium">
                                        Berat Pakaian (kg)
                                    </label>
                                    <input onChange={(e) => setBeratPakaian(parseInt(e.target.value))}
                                        type="number"
                                        id="weight"
                                        name="weight"
                                        step="0.1"
                                        className="mt-1 p-2 w-full border rounded"
                                    />
                                </div>
                                <div className="flex flex-col ">
                                    <label className="block text-sm font-medium">Pilih Pembayaran</label>
                                    <div className="relative mt-1">
                                        <select id="mySelect" onChange={(e) => setMetodePembayaran(e.target.value)} name="mySelect" aria-label="Choose an option"
                                            className="block w-full py-2 px-3 rounded-md">
                                            <option value="transfer">Transfer</option>
                                            <option value="qris">Qris</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                        Submit Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </main >
    );
};
