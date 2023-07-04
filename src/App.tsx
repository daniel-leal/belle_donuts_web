import React from 'react'
import { CartProvider } from './contexts/CartContext'
import AppRouter from './routes/AppRouter'

const App: React.FC = () => {
  return (
    <CartProvider>
      <AppRouter />
    </CartProvider>
  )
}

export default App
