'use client';
import Footer from 'src/components/Footer';
// import TransactionWrapper from 'src/components/TransactionWrapper';
// import WalletWrapper from 'src/components/WalletWrapper';
import { useAccount } from 'wagmi';
import Header from 'src/components/Header';
import Home from 'src/components/Home';
import { TransactionsView } from 'src/components/TransactionsView';
import ProjectDemo from 'src/components/ProjectDemo';

export default function Page() {
  const { isConnected } = useAccount();

  return (
    <div className="">
      <Header />
      <div>
      {isConnected ? <TransactionsView /> : <Home />}
      {isConnected && < ProjectDemo/>}
      </div>
      <Footer />
    </div>
  );
}
