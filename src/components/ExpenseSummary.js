import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import './ExpenseSummary.css'

const ExpenseSummary = ({ expenses }) => {
  // Calculate expenses by category
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find(item => item.name === expense.category)
    if (existing) {
      existing.value += expense.amount
    } else {
      acc.push({ name: expense.category, value: expense.amount })
    }
    return acc
  }, [])

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  // Color palette for different categories
  const COLORS = [
    '#8B5CF6', // Purple
    '#F59E0B', // Orange
    '#10B981', // Green
    '#EF4444', // Red
    '#3B82F6', // Blue
    '#8B5A2B', // Brown
    '#EC4899', // Pink
    '#6B7280'  // Gray
  ]

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null // Don't show labels for slices less than 5%

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  if (categoryData.length === 0) {
    return (
      <div className="expense-summary">
        <div className="card">
          <h2>Expense Summary</h2>
          <div className="empty-chart">
            <p>No expenses to display</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="expense-summary">
      <div className="card">
        <h2>Expense Summary</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`₹${value.toFixed(2)}`, 'Amount']}
                labelStyle={{ color: '#333' }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => <span style={{ color: '#333' }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="summary-stats">
          <div className="stat-item">
            <span className="stat-label">Total Expenses:</span>
            <span className="stat-value">₹{totalExpenses.toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Categories:</span>
            <span className="stat-value">{categoryData.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpenseSummary
