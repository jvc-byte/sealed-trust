import { CreateAgreement } from './contracts_interaction/WriteContract/CreateAgreement';
import { GetAgreement } from './contracts_interaction/ReadContract/GetAgreement';
import { ConfirmDelivery } from './contracts_interaction/WriteContract/ConfirmDelivery';
import { Refund } from './contracts_interaction/WriteContract/Refund';
import { TransferOwnership } from './contracts_interaction/WriteContract/TransferOwnership';
import { RenounceOwnership } from './contracts_interaction/WriteContract/RenounceOwnership';


export function TransactionsView() {

    return (
        <div className='flex-cloumn lg:flex mt-20 mb-1'>

            {/* Create Aggreement */}
            <div className="mt-4 w-1/2 bg-base-100 p-6 h-1/2 container lg:mr-1 lg:ml-1 rounded-lg">
                <h1 className="block text-justify lg:text-center pl-2 text-base lg:text-3xl text-teal-200 tracking-widest font-extrabold bg-opacity-80 bg-base-100 mb-4">Set Agreement</h1>

                <CreateAgreement />
                <Refund />

            </div>

            {/* View Agreement State */}
            <div className="mt-4 w-1/2 bg-base-100 p-6 h-1/2 container lg:mr-1 lg:ml-1 rounded-lg">
                <h1 className="block text-justify lg:text-center pl-2 text-base lg:text-3xl text-teal-200 tracking-widest font-extrabold bg-opacity-80 bg-base-100 mb-4">Track Agreement State</h1>

                <GetAgreement />
                <ConfirmDelivery />
                
            </div>

            {/* Danger Zone */}
            <div className="bg-base-100 mt-4 w-1/2 p-6 h-1/2 container lg:mr-1 lg:ml-1 rounded-lg border-2 border-red-800">
                <h1 className="block text-justify lg:text-center pl-2 text-base lg:text-3xl text-teal-200 tracking-widest font-extrabold bg-opacity-80 bg-base-100 mb-4">Danger Zone</h1>

                <TransferOwnership />
                <h2 className="block text-justify lg:text-center pl-2 text-base lg:text-2xl text-teal-200 tracking-widest font-extrabold bg-opacity-80 bg-base-100 mb-4">Irreversible Actions</h2>
                <RenounceOwnership />
                
            </div>
        </div >
    )
}
