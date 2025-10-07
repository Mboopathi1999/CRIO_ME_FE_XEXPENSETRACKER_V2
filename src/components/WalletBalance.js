import React from 'react'
import './WalletBalance.css'

const WalletBalance = ({ balance, onAddBalance }) => {
  return (
    <div className="wallet-balance">
      <div className="card">
        <h2>Wallet Balance: ₹{balance.toFixed(2)}</h2>
        <button
          type="button"
          className="btn btn-success"
          onClick={onAddBalance}
        >
          + Add Income
        </button>
      </div>
    </div>
  )
}

export default WalletBalance
