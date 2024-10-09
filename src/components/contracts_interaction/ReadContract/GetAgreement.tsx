import React, { FormEvent, useState, useCallback } from 'react';
import { type Hex, formatEther, BaseError } from 'viem';
import { useReadContract } from 'wagmi';

// Assuming you have your contract ABI and address defined somewhere
import { contractAbi, contractAddress } from '../../../constants';

// Define the State enum to match your contract
enum State {
    "AWAITING PAYMENT",
    "AWAITING DELIVERY",
    COMPLETE,
    REFUNDED
}

interface AgreementDetails {
    buyer: Hex;
    seller: Hex;
    amount: bigint;
    state: State;
    description: string;
}

const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

interface CopyIconProps {
    isCopied: boolean;
}

const CopyIcon: React.FC<CopyIconProps> = ({ isCopied }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-all duration-300 ${isCopied ? 'text-green-500' : 'text-gray-500'}`}>
        {isCopied ? (
            <path d="M20 6L9 17l-5-5" />
        ) : (
            <>
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </>
        )}
    </svg>
);

export function GetAgreement() {
    const [agreementId, setAgreementId] = useState<string>('');
    const [agreementDetails, setAgreementDetails] = useState<AgreementDetails | null>(null);
    const [copiedStates, setCopiedStates] = useState({
        buyer: false,
        seller: false
    });

    const { data, error, isLoading, refetch } = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'getAgreement',
        args: [BigInt(agreementId || '0')],
    });

    const fetchAgreementDetails = useCallback(async () => {
        if (agreementId) {
            const result = await refetch();
            if (result.data) {
                setAgreementDetails({
                    buyer: result.data[0],
                    seller: result.data[1],
                    amount: result.data[2],
                    state: result.data[3],
                    description: result.data[4],
                });
            }
        }
    }, [agreementId, refetch]);

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const id = formData.get('agreementId') as string;
        setAgreementId(id);
        await fetchAgreementDetails();
    }

    const copyToClipboard = (text: string, field: 'buyer' | 'seller') => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedStates(prev => ({ ...prev, [field]: true }));
            setTimeout(() => {
                setCopiedStates(prev => ({ ...prev, [field]: false }));
            }, 2000); // Reset after 2 seconds
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    const formatAmount = (amount: bigint) => {
        const ethAmount = parseFloat(formatEther(amount));
        return `${ethAmount.toFixed(4)} ETH`;
    };

    return (
        <div className="pb-7">
            <form className="set" onSubmit={submit}>
                <h1 className="pl-2 text-base lg:text-xl text-teal-200 tracking-widest font-extrabold bg-opacity-80 bg-base-100 mb-4">Check Agreement Status</h1>
                <label className="input input-bordered flex items-center gap-2 mb-4">
                    <input
                        className="grow"
                        name="agreementId"
                        placeholder="Agreement ID"
                        type="number"
                        step="1"
                        required
                        value={agreementId}
                        onChange={(e) => setAgreementId(e.target.value)}
                    />
                </label>
                <button disabled={isLoading} type="submit" className='btn btn-outline btn-accent w-full text-base'>
                    {isLoading ? 'Fetching...' : 'Get Agreement Details'}
                </button>
            </form>
            {isLoading && <div>Fetching agreement details...</div>}
            {error && (<div>Error: {(error as BaseError).shortMessage || error.message}</div>)}
            {agreementDetails && (

                <div className="mt-4">
                    <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border">
                        <div className="collapse-title text-lg font-bold">View Agreement Details:</div>
                        <div className="collapse-content">
                            <p className="flex items-center">
                                Buyer: {shortenAddress(agreementDetails.buyer)}
                                <button onClick={() => copyToClipboard(agreementDetails.buyer, 'buyer')} className="ml-2 focus:outline-none">
                                    <CopyIcon isCopied={copiedStates.buyer} />
                                </button>
                            </p>
                            <p className="flex items-center">
                                Seller: {shortenAddress(agreementDetails.seller)}
                                <button onClick={() => copyToClipboard(agreementDetails.seller, 'seller')} className="ml-2 focus:outline-none">
                                    <CopyIcon isCopied={copiedStates.seller} />
                                </button>
                            </p>
                            <p>Amount: {formatAmount(agreementDetails.amount)}</p>
                            <p>State: {State[agreementDetails.state]}</p>
                            <p>Description: {agreementDetails.description}</p>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
}