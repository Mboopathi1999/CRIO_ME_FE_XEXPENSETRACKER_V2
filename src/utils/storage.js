// Utility functions for localStorage operations

export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : defaultValue
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return defaultValue
  }
}

export const clearStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error('Error clearing localStorage:', error)
  }
}
