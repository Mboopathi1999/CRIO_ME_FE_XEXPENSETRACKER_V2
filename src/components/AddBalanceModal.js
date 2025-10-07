import React, { useState } from 'react'
import './Modal.css'

const AddBalanceModal = ({ isOpen, onClose, onAddBalance }) => {
  const [amount, setAmount] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const numAmount = parseFloat(amount)

    if (numAmount > 0) {
      onAddBalance(numAmount)
      setAmount('')
    } else {
      alert('Please enter a valid amount greater than 0')
    }
  }

  const handleClose = () => {
    setAmount('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={handleClose}>
          ×
        </button>
        <div className="modal-header">
          <h2>Add Balance</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Income Amount"
              step="0.01"
              min="0"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-orange">
              Add Balance
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddBalanceModal
