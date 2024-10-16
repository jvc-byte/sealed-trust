'use client';
import WalletWrapper from './WalletWrapper';

export default function SignupButton() {
  return (
    <WalletWrapper
      className="min-w-[2rem] hidden btn btn-accent"
      text="Connect Coinbase"
    />
  );
}
