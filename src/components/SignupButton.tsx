'use client';
import WalletWrapper from './WalletWrapper';

export default function SignupButton() {
  return (
    <WalletWrapper
      className="min-w-[90px] btn btn-accent"
      text="Connect Coinbase"
    />
  );
}
