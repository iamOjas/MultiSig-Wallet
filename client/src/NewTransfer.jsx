import React, { useState } from 'react'

function NewTransfer({createTransfer}) {

    const [transfer, SetTransfer] = useState(undefined);
    const [amount ,setAmount] = useState('');
    const [to ,setTo] = useState('');

    
    const updateTransfer = (e, field) => {
        const value = e.target.value;
        if(field === 'amount'){
            setAmount(e.target.value)
        }
        if(field === 'to'){
            setTo(e.target.value)
        }
        SetTransfer({...transfer, [field] : value});
    }

    const submit = e =>{
        e.preventDefault();
        setAmount(0);
        setTo('');
        createTransfer(transfer);
    }
    return (
        <div>
            <h2>Create Transfer</h2>
            <form onSubmit={submit}>
                <label htmlFor="amount">Amount</label>
                <input 
                type="text"
                id='amount'
                onChange={e => {updateTransfer(e,'amount')}}
                value={amount}
                required
                 />
                <label htmlFor="to">To</label>
                <input 
                type="text"
                id='to'
                value={to}
                onChange={e => {updateTransfer(e,'to')}}
                required
                 />

                 <button type="submit">Submit Transaction</button>

            </form>
        </div>
    )
}

export default NewTransfer
