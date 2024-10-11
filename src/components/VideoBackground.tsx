import React from 'react';

export default function VideoBackground() {
    return (
        <div className="relative w-full h-lvh overflow-hidden mt-16">
            <video
                src="/videos/bg.mp4" // Ensure the path is correct relative to your public directory
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover" // Make it cover the entire div
            />
            <div className="absolute inset-0 bg-black opacity-25" /> {/* Optional dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black pointer-events-none" /> {/* Gradient overlay */}
            <div className="absolute inset-0 blur-2xl" /> {/* Blurry edges */}

            <div className="relative z-10 flex items-center justify-center h-full text-white">

                <div className='flex-column'>
                    <h2 className='text-base text-center lg:text-justify lg:text-2xl font-thin landing-pg-intro-txt leading-loose mb-10 animate-slideDown'>Your Number one platform for trustless deal-making.</h2>
                    <h1 className="text-4xl text-center lg:text-left font-bold lg:text-7xl mb-10 animate-slideUp">Ensuring funds are only released</h1>
                    <h1 className="text-4xl text-center lg:text-left font-bold mb-10 lg:text-7xl text-teal-300 animate-slideUp">when both parties meet the agreement</h1>

                    <div className="flex-column lg:flex gap-10 mt-6">
                        <button className="btn btn-outline btn-accent px-10 w-96 animate-slideUp"><svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg></button>
                        <button className="btn glass w-96 animate-slideUp">Book A Demo</button>
                    </div>

                </div>

            </div>
        </div>
    );
}
