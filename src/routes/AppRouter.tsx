import Cart from '@pages/Cart'
import Home from '@pages/Home'
import ProductDetails from '@pages/ProductDetails'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
