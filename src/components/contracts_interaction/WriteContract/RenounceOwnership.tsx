import React, { FormEvent, useState } from 'react';
import { type BaseError, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { contractAbi, contractAddress } from '../../../constants';

export function RenounceOwnership() {
    const [transactionHash, setTransactionHash] = useState<`0x${string}` | null>(null);
    const [confirmationText, setConfirmationText] = useState('');
    const [isConfirmationValid, setIsConfirmationValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const { writeContract, data: hash, error, isPending } = useWriteContract()

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    })

    const CONFIRMATION_PHRASE = "I understand that All the Assets Within This Application will be LOST FOREVER!!";

    const handleConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputText = e.target.value;
        setConfirmationText(inputText);
        setIsConfirmationValid(inputText.toLowerCase() === CONFIRMATION_PHRASE.toLowerCase());
    };

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (isConfirmationValid) {
            writeContract({
                abi: contractAbi,
                address: contractAddress,
                functionName: 'renounceOwnership',
            })
        }
    }

    const handleError = (err: any) => {
        if (err.message && err.message.includes('The contract function "renounceOwnership" reverted.')) {
            setErrorMessage("Unauthorized user. Only the current owner can renounce ownership.");
        } else {
            setErrorMessage((err as BaseError).shortMessage || err.message);
        }
    };

    React.useEffect(() => {
        if (error) {
            handleError(error);
        }
    }, [error])

    React.useEffect(() => {
        if (hash) {
            setTransactionHash(hash);
        }
    }, [hash]);

    const getTransactionLink = (txHash: `0x${string}`) => {
        return `https://sepolia.basescan.org/tx/${txHash}`;
    }

    return (
        <div className="pb-7">
            <form className="set" onSubmit={submit}>
                <h1 className="pl-2 text-base lg:text-xl text-red-500 tracking-widest font-extrabold bg-opacity-80 bg-base-100 mb-4">Renounce Ownership</h1>
                
                <div className="mb-4">
                    <label htmlFor="confirmationInput" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        <span className='text-sm text-justify'>Type "<span className='text-slate-400'>{CONFIRMATION_PHRASE}</span>" to confirm:</span>
                    </label>
                    <input
                        type="text"
                        id="confirmationInput"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Type the confirmation phrase"
                        value={confirmationText}
                        onChange={handleConfirmationChange}
                    />
                </div>
               
                <button 
                    disabled={isPending || !isConfirmationValid} 
                    type="submit" 
                    className={`btn btn-outline btn-error w-full ${!isConfirmationValid && 'opacity-50 cursor-not-allowed'}`}
                >
                    {isPending ? 'Renouncing Ownership...' : 'I confirm that I Want to Lose All Asset'}
                </button>
            </form>
            {transactionHash && (
                <div className="mt-4">
                    <p>Transaction Hash: {transactionHash}</p>
                    <a 
                        href={getTransactionLink(transactionHash)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700"
                    >
                        View transaction on Sepolia Basescan
                    </a>
                </div>
            )}
            {isConfirming && <div className="mt-2">Waiting for confirmation...</div>}
            {isConfirmed && <div className="mt-2 text-green-500">Ownership Transferred successfully.</div>}
            {error && (<div className="mt-2 text-red-500 bg-red-100 border border-red-400 rounded p-2">Error: {errorMessage}</div>)}
        </div>
    )
}
