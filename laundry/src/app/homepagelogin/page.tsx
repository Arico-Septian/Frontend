'use client';

import { FaPlus } from 'react-icons/fa'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

interface MyData {
    jumlah_pakaian: string;
    metode_pembayaran: string
    penilaian: string;
    berat_pakaian: string;
    orderid: string;
    kategori_laundry: string;
    jumlah_pembayaran: string;
    userid: {
        userid: string;
        username: string;
    }
}

export default function HomePageLogin() {

    const [data, setData] = useState<MyData[] | null>(null);
    const router = useRouter();
    const jwt = require('jsonwebtoken');
    let userId = ''
    let role = ''

    const jwtString = localStorage.getItem('token');

    try {
        if (jwtString) {
            const decoded: any = jwt.decode(jwtString);

            userId = decoded.sub;
            role = decoded.role;
        }
    } catch (error: any) {
        console.error('JWT verification failed:', error.message);
    }

    useEffect(() => {
        const getData = async () => {
            let response;
            try {
                if (role == 'admin') {
                    response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/order`);
                } else {
                    response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/order/${userId}`);
                }
                const result = response
                if (response.status === 200 || response.status === 201) {
                    setData(result.data)
                } else {
                    console.error('Login failed');
                }
            } catch (error) {
                console.error('An error occurred during login:', error);
            }
        };
        getData()
    }, [])

    const axiosConfig = {
        headers: {
            'Authorization': `Bearer ${jwtString}`,
            'Content-Type': 'application/json',
        },
    };

    const deletedata = async (orderid: string) => {
        let response;
        try {
            response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/order/${orderid}/delete`, axiosConfig);
            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    title: 'Delete order success',
                    text: `Anda telah menghapus orderan`,
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                router.push('/homepagelogin')
                window.location.reload()
            } else {
                console.error('delete failed');
            }
        } catch (error) {
            console.error('An error occurred during login:', error);
        }
    };

    return (
        <main>
            <head>
                <title> Home Page Login </title>
            </head>

            <div className='bg-gradient-to-r from-blue-300 from-10% via-yellow-400 via-40% to-blue-300 to-100% bg-cover w-full min-h-screen'>
                <nav className=" flex justify-center h-[150px] ">
                    <div className="w-[1240px] flex items-center justify-between">
                        <div className="flex items-center w-[577px] justify-between">
                            <div className="flex w-[340px] justify-between">
                                <a href='/homepagelogin' className='font-semibold'>Home</a>
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

                <div className="container mx-auto mt-8">
                    <table className="table-auto min-w-full bg-white border-separate rounded-3xl mt-10">
                        <thead>
                            <tr>
                                {role == 'admin' &&
                                    <th className="py-2 px-4"> Username </th>
                                }
                                {role == 'admin' &&
                                    <th className="py-2 px-4"> UserId </th>
                                }
                                <th className="py-2 px-4">Berat Pakaian (kg)</th>
                                <th className="py-2 px-4">Jumlah Pakaian</th>
                                <th className="py-2 px-4">Kategori Laundry</th>
                                <th className="py-2 px-4">Payment</th>
                                <th className="py-2 px-4">Jumlah pembayaran</th>
                                <th className="py-2 px-4">Action</th>
                            </tr>
                        </thead>
                        {data ? (
                            <tbody>
                                {data.map((item, index) => (
                                    <tr>
                                        {role == 'admin' &&
                                            <td className="py-2 px-4 border-b">{item.userid.username}</td>
                                        }
                                        {role == 'admin' &&
                                            <td className="py-2 px-4 border-b">{item.userid.userid}</td>
                                        }

                                        <td className="py-2 px-4 border-b">{item.berat_pakaian}</td>
                                        <td className="py-2 px-4 border-b">{item.jumlah_pakaian}</td>
                                        <td className="py-2 px-4 border-b">{item.kategori_laundry}</td>
                                        <td className="py-2 px-4 border-b">{item.metode_pembayaran}</td>
                                        <td className="py-2 px-4 border-b">{item.jumlah_pembayaran}</td>
                                        <td className="py-2 px-4 border-b">
                                            <a href={`/order/${item.orderid}`}>
                                                edit
                                            </a>
                                            <br />
                                            <button onClick={() => deletedata(item.orderid)}>
                                                delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                            <p>data tidak ditemukan</p>
                        )}
                    </table>
                </div>
            </div>
        </main>
    )
}