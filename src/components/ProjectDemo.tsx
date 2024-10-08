
export default function ProjectDemo() {
    return (
        <>
            <div className="hero bg-base-100 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">

                    <div>
                        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/HoOt8NeLbv0?si=Iqey3wANeQ-5WGfU"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" >
                        </iframe>
                    </div>
                    <div>
                        <h2 className='text-base lg:text-xl font-thin landing-pg-intro-txt leading-loose mb-5 animate-slideDown'>Project Demo</h2>
                        <p className="text-xl animate-slideUp text-justify">A decentralized escrow platform where parties can engage in
                            agreements with full assurance that the terms of the deal will be met before any funds are released. Using smart
                            contracts deployed on the Base blockchain, a secure environment for deal-making is assured.
                        </p>
                        <div>
                            <h1 className=" text-lg text-teal-300 mt-5">Key Features of SealedTrust:</h1>
                            <ul className="text-sm indent-8 ">
                                <li className="text-sm animate-slideUp text-teal-300 text-justify break-words leading-8">✓ Tamper-proof</li>
                                <li className="text-sm animate-slideUp text-teal-300 text-justify break-words leading-8">✓ Trustless Escrow</li>
                                <li className="text-sm animate-slideUp text-teal-300 text-justify break-words leading-8">✓ Fraud Protection</li>
                                <li className="text-sm animate-slideUp text-teal-300 text-justify break-words leading-8">✓ Transparent Process</li>
                                <li className="text-sm animate-slideUp text-teal-300 text-justify break-words leading-8">✓ User-Friendly Interface</li>
                                <li className="text-sm animate-slideUp text-teal-300 text-justify break-words leading-8">✓ Global Accessibility</li>
                                <li className="text-sm animate-slideUp text-teal-300 text-justify break-words leading-8">⨀ Dispute Resolution via Multisig Wallet</li>
                            </ul>
                        </div>
                        <p className="py-6"></p>
                        <button className="btn btn-outline btn-accent w-96 glass">Secure Your transaction now!</button>
                    </div>
                </div>
            </div>

        </>
    );
}