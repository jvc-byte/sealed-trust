'use client';

import React from "react";
import { useAccount } from 'wagmi';
import LoginButton from '../components/LoginButton';
import SignupButton from '../components/SignupButton';

export default function Header() {
    const { address } = useAccount();

    return (
        <div className="navbar bg-base-100 fixed top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a className="text-gray-200 text-lg hover:text-white transition-color ease-in-out duration-500">Features</a></li>
                        <li><a className="text-gray-200 text-lg hover:text-white transition-color ease-in-out duration-500">Solutions</a></li>
                        <li><a className="text-gray-200 text-lg hover:text-white transition-color ease-in-out duration-500">Resources</a></li>
                        <li><a className="text-gray-200 text-lg hover:text-white transition-color ease-in-out duration-500">About us</a></li>
                    </ul>
                </div>
                <div className="flex">
                    <a href="#"><img src="favicon.ico" alt="Logo" className="w-21 h-auto" /></a>
                    <a href="#" className="hidden xl:block btn pl-2 text-3xl text-teal-200 leading-10 tracking-widest font-extrabold bg-opacity-80 bg-base-100">
                        SealedTrust
                    </a>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a className="text-gray-200 text-lg hover:text-white transition-color ease-in-out duration-500">Features</a></li>
                    <li><a className="text-gray-200 text-lg hover:text-white transition-color ease-in-out duration-500">Solutions</a></li>
                    <li><a className="text-gray-200 text-lg hover:text-white transition-color ease-in-out duration-500">Resources</a></li>
                    <li><a className="text-gray-200 text-lg hover:text-white transition-color ease-in-out duration-500">About us</a></li>
                </ul>

            </div>

            <div className="navbar-end flex gap-3">
                <SignupButton /> {!address && <LoginButton />}
            </div>

        </div>
    );
}