import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import './ExpenseList.css'

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  return (
    <div className="expense-list">
      <div className="card">
        <h2>Transactions</h2>
        <div className="transactions-container">
          {expenses.length === 0 ? (
            <div className="empty-state">
              <p>No transactions yet. Add your first expense!</p>
            </div>
          ) : (
            expenses.map(expense => (
              <div key={expense.id} className="transaction-item">
                <div className="transaction-info">
                  <div className="transaction-title">{expense.title}</div>
                  <div className="transaction-details">
                    <span className="transaction-date">{formatDate(expense.date)}</span>
                    <span className="transaction-category">{expense.category}</span>
                  </div>
                </div>
                <div className="transaction-amount">
                  ₹{expense.amount.toFixed(2)}
                </div>
                <div className="transaction-actions">
                  <button
                    className="icon-button edit-button"
                    onClick={() => onEdit(expense)}
                    title="Edit expense"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="icon-button delete-button"
                    onClick={() => onDelete(expense.id)}
                    title="Delete expense"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ExpenseList
