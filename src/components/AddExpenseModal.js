import React, { useState, useEffect } from 'react'
import './Modal.css'

const AddExpenseModal = ({ isOpen, onClose, onAddExpense, editingExpense }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: ''
  })

  const categories = [
    'Food',
    'Entertainment',
    'Travel',
    'Shopping',
    'Bills',
    'Healthcare',
    'Education',
    'Other'
  ]

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        title: editingExpense.title,
        amount: editingExpense.amount.toString(),
        category: editingExpense.category,
        date: editingExpense.date
      })
    } else {
      setFormData({
        title: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0]
      })
    }
  }, [editingExpense, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title || !formData.amount || !formData.category || !formData.date) {
      alert('Please fill in all fields')
      return
    }

    const numAmount = parseFloat(formData.amount)
    if (numAmount <= 0) {
      alert('Please enter a valid amount greater than 0')
      return
    }

    onAddExpense({
      ...formData,
      amount: numAmount
    })

    // Reset form
    setFormData({
      title: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    })
  }

  const handleClose = () => {
    setFormData({
      title: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    })
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
          <h2>{editingExpense ? 'Edit Expense' : 'Add Expenses'}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter expense title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-orange">
              {editingExpense ? 'Update Expense' : 'Add Expense'}
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

export default AddExpenseModal
