import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import './ExpenseTrends.css'

const ExpenseTrends = ({ expenses }) => {
  // Group expenses by month
  const monthlyData = expenses.reduce((acc, expense) => {
    const date = new Date(expense.date)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: monthName,
        amount: 0,
        count: 0
      }
    }

    acc[monthKey].amount += expense.amount
    acc[monthKey].count += 1

    return acc
  }, {})

  const chartData = Object.values(monthlyData).sort((a, b) => {
    const dateA = new Date(a.month)
    const dateB = new Date(b.month)
    return dateA - dateB
  })

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0

  if (chartData.length === 0) {
    return (
      <div className="expense-trends">
        <div className="card">
          <h2>Top Expenses</h2>
          <div className="empty-chart">
            <p>No expense data available</p>
          </div>
        </div>
      </div>
    )
  }

  // Get top 5 expenses
  const topExpenses = [...expenses]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5)

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">
            Total: ₹{payload[0].value.toFixed(2)}
          </p>
          <p className="tooltip-count">
            {payload[0].payload.count} transaction{payload[0].payload.count !== 1 ? 's' : ''}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="expense-trends">
      <div className="card">
        <h2>Expense Trends</h2>

        {chartData.length > 0 && (
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  stroke="#666"
                  fontSize={12}
                />
                <YAxis
                  stroke="#666"
                  fontSize={12}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="amount"
                  fill="#8B5CF6"
                  radius={[4, 4, 0, 0]}
                  stroke="#7C3AED"
                  strokeWidth={1}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="trends-stats">
          <div className="stat-item">
            <span className="stat-label">Average Expense:</span>
            <span className="stat-value">₹{averageExpense.toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Transactions:</span>
            <span className="stat-value">{expenses.length}</span>
          </div>
        </div>

        {topExpenses.length > 0 && (
          <div className="top-expenses">
            <h3>Top 5 Expenses</h3>
            <div className="top-expenses-list">
              {topExpenses.map((expense, index) => (
                <div key={expense.id} className="top-expense-item">
                  <span className="rank">#{index + 1}</span>
                  <div className="expense-details">
                    <span className="expense-title">{expense.title}</span>
                    <span className="expense-category">{expense.category}</span>
                  </div>
                  <span className="expense-amount">₹{expense.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExpenseTrends
