import React from 'react';
import { BaseError } from 'viem';
import { useReadContract } from 'wagmi';
import { contractAbi, contractAddress } from '../../../constants';

export function GetAgreementCount() {
    const { data: agreementCount, error, isLoading, refetch } = useReadContract({
        address: contractAddress,
        abi: contractAbi,
        functionName: 'agreementCount',
    });

    const handleRefresh = () => {
        refetch();
    };

    return (
        <div className="pb-7">
            <h1 className="pl-2 text-base lg:text-xl text-teal-200 tracking-widest font-extrabold bg-opacity-80 bg-base-100 mb-4">
                Agreement Count
            </h1>
            
            <div className="flex items-center justify-between mb-4">
                <div className="text-lg">
                    {isLoading ? (
                        <span>Loading agreement count...</span>
                    ) : error ? (
                        <span className="text-red-500">Error: {(error as BaseError).shortMessage || error.message}</span>
                    ) : (
                        <span>Total Agreements: {agreementCount?.toString() || '0'}</span>
                    )}
                </div>
                <button 
                    onClick={handleRefresh} 
                    className="btn btn-outline btn-accent"
                    disabled={isLoading}
                >
                    Refresh
                </button>
            </div>
        </div>
    );
}