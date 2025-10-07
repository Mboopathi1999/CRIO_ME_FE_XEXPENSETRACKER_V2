import React, { useState, useEffect } from 'react'
import WalletBalance from './components/WalletBalance'
import AddBalanceModal from './components/AddBalanceModal'
import AddExpenseModal from './components/AddExpenseModal'
import ExpenseList from './components/ExpenseList'
import ExpenseSummary from './components/ExpenseSummary'
import ExpenseTrends from './components/ExpenseTrends'
import { loadFromStorage, saveToStorage } from './utils/storage'
import './App.css'

const App = () => {
  const [walletBalance, setWalletBalance] = useState(5000) // Default balance
  const [expenses, setExpenses] = useState([])
  const [isAddBalanceModalOpen, setIsAddBalanceModalOpen] = useState(false)
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState(null)

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedBalance = loadFromStorage('walletBalance', 5000)
    const savedExpenses = loadFromStorage('expenses', [])

    setWalletBalance(savedBalance)
    setExpenses(savedExpenses)
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveToStorage('walletBalance', walletBalance)
  }, [walletBalance])

  useEffect(() => {
    saveToStorage('expenses', expenses)
  }, [expenses])

  const handleAddBalance = (amount) => {
    if (amount > 0) {
      setWalletBalance(prev => prev + amount)
      setIsAddBalanceModalOpen(false)
    }
  }

  const handleAddExpense = (expenseData) => {
    if (expenseData.amount > walletBalance) {
      alert('Insufficient wallet balance!')
      return
    }

    if (editingExpense) {
      // Edit existing expense
      const oldExpense = expenses.find(exp => exp.id === editingExpense.id)
      const amountDifference = expenseData.amount - oldExpense.amount

      setExpenses(prev => prev.map(exp =>
        exp.id === editingExpense.id
          ? { ...expenseData, id: editingExpense.id }
          : exp
      ))

      setWalletBalance(prev => prev - amountDifference)
      setEditingExpense(null)
    } else {
      // Add new expense
      const newExpense = {
        ...expenseData,
        id: Date.now().toString()
      }

      setExpenses(prev => [newExpense, ...prev])
      setWalletBalance(prev => prev - expenseData.amount)
    }

    setIsAddExpenseModalOpen(false)
  }

  const handleEditExpense = (expense) => {
    setEditingExpense(expense)
    setIsAddExpenseModalOpen(true)
  }

  const handleDeleteExpense = (expenseId) => {
    const expenseToDelete = expenses.find(exp => exp.id === expenseId)
    if (expenseToDelete) {
      setExpenses(prev => prev.filter(exp => exp.id !== expenseId))
      setWalletBalance(prev => prev + expenseToDelete.amount)
    }
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="App">
      <div className="container">
        <h1>Expense Tracker</h1>

        <div className="dashboard">
          <div className="wallet-section">
            <WalletBalance
              balance={walletBalance}
              onAddBalance={() => setIsAddBalanceModalOpen(true)}
            />
          </div>

          <div className="expense-summary-section">
            <div className="card">
              <h2>Expenses: ₹{totalExpenses.toFixed(2)}</h2>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => setIsAddExpenseModalOpen(true)}
              >
                + Add Expense
              </button>
            </div>
          </div>

          <div className="chart-section">
            <ExpenseSummary expenses={expenses} />
          </div>
        </div>

        <div className="content-section">
          <div className="transactions-section">
            <ExpenseList
              expenses={expenses}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
            />
          </div>

          <div className="trends-section">
            <ExpenseTrends expenses={expenses} />
          </div>
        </div>

        {/* Modals */}
        <AddBalanceModal
          isOpen={isAddBalanceModalOpen}
          onClose={() => setIsAddBalanceModalOpen(false)}
          onAddBalance={handleAddBalance}
        />

        <AddExpenseModal
          isOpen={isAddExpenseModalOpen}
          onClose={() => {
            setIsAddExpenseModalOpen(false)
            setEditingExpense(null)
          }}
          onAddExpense={handleAddExpense}
          editingExpense={editingExpense}
        />
      </div>
    </div>
  )
}

export default App
