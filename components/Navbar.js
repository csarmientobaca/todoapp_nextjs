"use client";
import React from 'react'
import Image from 'next/image';
import { FaMoon, FaSun } from 'react-icons/fa';
import Logo from '/public/logo.png';
import Logo2 from '/public/logo2.png';
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../app/firebase";


export default function Navbar() {

    const [user] = useAuthState(auth);

    const { systemTheme, theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsLoading(false);
        };
        load();
    }, []);


    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    const currentTheme = theme === 'system' ? systemTheme : theme;



    return (
        <div className="mx-auto" style={{ maxWidth: '600px' }}>
            {isLoading ? (
                <Loading />
            ) : (
                <header className={`flex items-center justify-between py-6 px-10 mx-auto rounded bg-gray-800 text-black`}>
                    <div className="flex items-center flex-1">
                        {currentTheme === 'dark' ? (
                            <>
                                <Image src={Logo2} alt="Logo" width={70} height={70} className="mr-4" />
                                <h1 className="text-lg font-bold flex-1 text-center text-white">My Todo List</h1>
                            </>
                        ) : (
                            <>
                                <Image src={Logo} alt="Logo" width={70} height={70} className="mr-4" />
                                <h1 className="text-lg font-bold flex-1 text-center ">My Todo List</h1>
                            </>
                        )}
                    </div>
                    <div className="flex items-center">
                        <div>
                            <div className="flex justify-center">

                                {currentTheme === 'dark' ? (
                                    <button
                                        className="bg-black-700 hover:bg-black w-15 p-3 m-3 rounded-full border-2"
                                        onClick={() => setTheme('light')}
                                    >
                                        {' '}
                                        <FaSun className={`h-6 w-6 text-gray-200`} />
                                    </button>
                                ) : (
                                    <button
                                        className="bg-gray-100 w-15 p-3 m-3 rounded-md border-2  hover:bg-gray-300"
                                        onClick={() => setTheme('dark')}
                                    >
                                        <FaMoon className={`h-6 w-6 text-black`} />
                                    </button>
                                )}

                            </div>
                        </div>
                        <Image src={user?.photoURL} alt='google profile' width={70} height={70} className="h-10 w-10 rounded-full cursor-pointer"
                            onClick={() => {
                                auth.signOut();
                                localStorage.clear();
                            }} />
                    </div>
                </header>
            )}
        </div>
    )
}
