import React, { FormEvent, useState } from 'react';
import { type BaseError, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { contractAbi, contractAddress } from '../../../constants';

export function ConfirmDelivery() {
    const [transactionHash, setTransactionHash] = useState<`0x${string}` | null>(null);

    const { writeContract, data: hash, error, isPending } = useWriteContract()

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    })

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const agreementId = BigInt(formData.get('agreementId') as string)

        writeContract({
            abi: contractAbi,
            address: contractAddress,
            functionName: 'confirmDelivery',
            args: [agreementId],
        })
    }

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
                <h1 className="pl-2 text-base lg:text-xl text-teal-200 tracking-widest font-extrabold bg-opacity-80 bg-base-100 mb-4">Confirm Delivery</h1>
                <label className="input input-bordered flex items-center gap-2 mb-4">
                    <input name="agreementId" type="number" className="grow" placeholder="Agreement ID" required />
                </label>
                <button disabled={isPending} type="submit" className='btn btn-outline btn-accent w-full'>
                    {isPending ? 'Confirming delivery...' : 'Confirm Delivery'}
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
            {isConfirmed && <div className="mt-2 text-green-500">Delivery confirmed successfully.</div>}
            {error && (<div className="mt-2 text-red-500">Error: {(error as BaseError).shortMessage || error.message}</div>)}
        </div>
    )
}