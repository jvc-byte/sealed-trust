import React, { FormEvent, useState } from 'react';
import { type Hex, parseEther } from 'viem';
import { type BaseError, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import AgreementTextarea from '../../AgreementTextArea';

// Assuming you have your contract ABI and address defined somewhere
import { contractAbi, contractAddress } from '../../../constants';

export function CreateAgreement() {
    const [transactionHash, setTransactionHash] = useState<`0x${string}` | null>(null);

    const { writeContract, data: hash, error, isPending } = useWriteContract()

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
        hash,
    })

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const payer = formData.get('address') as Hex
        const amount = formData.get('value') as string
        const description = formData.get('description') as string

        writeContract({
            abi: contractAbi,
            address: contractAddress,
            functionName: 'createAgreement',
            args: [payer, description],
            value: parseEther(amount),
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
                <h1 className="pl-2 text-base lg:text-xl text-teal-200 tracking-widest font-extrabold bg-opacity-80 bg-base-100 mb-4">Create Agreement</h1>
                <label className="input input-bordered flex items-center gap-2 mb-4">
                    <input name="address" type="text" className="grow" placeholder="Seller Address" required />
                </label>
                <label className="input input-bordered truncate flex items-center gap-2 mb-4">
                    <input className="grow" name="value" placeholder="Agreement Amount (ETH)" type="number" step="0.000000001" required />
                </label>
                <AgreementTextarea />
                <button disabled={isPending} type="submit" className='btn btn-outline btn-accent w-full'>
                    {isPending ? 'Confirming agreement...' : 'Create agreement'}
                </button>
            </form>
            {transactionHash && (
                <div className="mt-4">
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
            {isConfirmed && <div className="mt-2 text-green-500">Transaction confirmed.</div>}
            {error && (<div className="mt-2 text-red-500">Error: {(error as BaseError).shortMessage || error.message}</div>)}
        </div>
    )
}