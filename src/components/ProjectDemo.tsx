
export default function ProjectDemo() {
    return (
        <div className="bg-base-100 flex flex-col lg:flex-row items-center lg:items-start px-4 lg:px-8 py-8 lg:py-16">
            <div className="w-full lg:w-1/2">
                <h2 className='text-base lg:text-xl font-thin landing-pg-intro-txt leading-loose mb-5 animate-slideDown'>Project Demo</h2>
                <p className="text-lg lg:text-xl animate-slideUp text-justify mb-5">
                    A decentralized escrow platform where parties can engage in agreements with full assurance that the terms of the deal will be met before any funds are released. Using smart contracts deployed on the Base blockchain, a secure environment for deal-making is assured.
                </p>

                <h1 className="text-lg text-teal-300 mt-5">Key Features of SealedTrust:</h1>
                <ul className="text-sm lg:text-base indent-8 space-y-3">
                    <li className="animate-slideUp text-teal-300 text-justify">✓ Tamper-proof</li>
                    <li className="animate-slideUp text-teal-300 text-justify">✓ Trustless Escrow</li>
                    <li className="animate-slideUp text-teal-300 text-justify">✓ Fraud Protection</li>
                    <li className="animate-slideUp text-teal-300 text-justify">✓ Transparent Process</li>
                    <li className="animate-slideUp text-teal-300 text-justify">✓ User-Friendly Interface</li>
                    <li className="animate-slideUp text-teal-300 text-justify">✓ Global Accessibility</li>
                    <li className="animate-slideUp text-teal-300 text-justify">⨀ Dispute Resolution via Multisig Wallet</li>
                </ul>
            </div>

            <div className="relative w-full lg:w-1/2 mt-8 lg:mt-0 lg:ml-10">
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/Q0FqGT4z7X8?si=vlDchvJU4nbhTjP9"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </div>

                <div className="mt-8">
                    <button className="btn btn-outline btn-accent w-full lg:w-96 glass">
                        Secure Your Transaction Now!
                    </button>
                </div>
            </div>
        </div>
    );
}