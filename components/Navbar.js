"use client";
import React from 'react'
import Image from 'next/image';
import { FaMoon, FaMicrophone, FaSun } from 'react-icons/fa';
import Logo from '/public/logo.png';
import Logo2 from '/public/logo2.png';
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react';
import Loading from '@/app/loading';

export default function Navbar() {
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
                        <Image src={Logo} alt="Logo" width={70} height={70} className="mr-4" />
                        <h1 className="text-lg font-bold flex-1 text-center">My Todo List</h1>
                    </div>
                    <div className="flex items-center">
                        <div>
                            <div className="flex justify-center">
                                {currentTheme === 'dark' ? (
                                    <button
                                        className="bg-black-700 hover:bg-black w-28 rounded-full border-purple-400 border-2 p-4"
                                        onClick={() => setTheme('light')}
                                    >
                                        {' '}
                                        <FaSun className={`h-6 w-6 text-black`} />
                                    </button>
                                ) : (
                                    <button
                                        className="bg-gray-100 w-28 rounded-md border-purple-400 border-2 p-4 hover:bg-gray-300"
                                        onClick={() => setTheme('dark')}
                                    >
                                        <FaMoon className={`h-6 w-6 text-black`} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </header>
            )}
        </div>
    )
}
