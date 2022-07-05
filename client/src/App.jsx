import React, { useState, useEffect } from 'react'
import Header from './Header';
import {getWallet, getWeb3} from './utils'
import NewTransfer from './NewTransfer';
import TransferList from './TransferList';

function App() {
  const [web3,setWeb3] = useState(undefined);
  const [accounts,setAccounts] = useState(undefined);
  const [wallet,setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState([]);
  const [quorum, setQuorum] = useState(undefined);
  const [transfers, getTransfers] = useState([]);

  useEffect(() => {
    const init = async() =>{
      const web3 = await getWeb3();
      console.log(web3.eth)
      const accounts = await web3.eth.requestAccounts();
      const wallet = await getWallet(web3);
      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();
      const transfers = await wallet.methods.getTransfers().call();
      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
      setApprovers(approvers);
      setQuorum(quorum); 
      getTransfers(transfers);
    }
    init();
  },[])

  console.log(transfers)

  if(
    typeof web3 === 'undefined'
    || typeof accounts === 'undefined'
    || typeof wallet === 'undefined'
    || approvers.length === 0
    || typeof quorum === 'undefined'
  ){
    return <div>Loading...</div>;
  }

  const createTransfer = async (transfer) => {
    wallet.methods
    .createTransfer(transfer.amount, transfer.to)
    .send({from: accounts[0]});

    const transfers = await wallet.methods.getTransfers().call();
    getTransfers(transfers);

  }

  const approveTransfer = async (id) => {
    wallet.methods
    .approveTransfer(id)
    .send({from: accounts[0]});

    const transfers = await wallet.methods.getTransfers().call();
    getTransfers(transfers);
  }

  return (
    <>
      MultiSig Wallet
      <Header approvers={approvers} quorum = {quorum} />
      <NewTransfer createTransfer={createTransfer} />
      <TransferList transfers = {transfers}  approveTransfer ={approveTransfer}/>
    </>
  );
}

export default App;
