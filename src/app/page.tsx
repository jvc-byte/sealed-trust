'use client';
import Footer from 'src/components/Footer';
// import TransactionWrapper from 'src/components/TransactionWrapper';
// import WalletWrapper from 'src/components/WalletWrapper';
// import { useAccount } from 'wagmi';
import Header from 'src/components/Header';
import Home from 'src/components/Home';

export default function Page() {

  return (
    <div className="">
      <Header />
      <div>
        <Home />
      </div>
      <Footer />
    </div>
  );
}
