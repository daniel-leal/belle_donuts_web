import { Product } from '@interfaces/Product'
import { createContext, useEffect, useState } from 'react'

interface CartContextProps {
  cart: Product[]
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: string) => void
  incrementProductQuantity: (productId: string) => void
  decrementProductQuantity: (productId: string) => void
  totalProducts: number
  updateOrderTotalPrice: () => void
  totalPrice: number
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
)

function CartProvider({ children }: React.PropsWithChildren) {
  const [cart, setCart] = useState<Product[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)

  useEffect(() => {
    updateOrderTotalPrice()
  }, [cart])

  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingProduct = prevCart.find(item => item.id === product.id)
      if (existingProduct) {
        const updatedCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
        return updatedCart
      } else {
        const newProduct = { ...product, quantity }
        return [...prevCart, newProduct]
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const incrementProductQuantity = (productId: string) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === productId && item.quantity < 99
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      return updatedCart
    })
  }

  const decrementProductQuantity = (productId: string) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      return updatedCart
    })
  }

  const totalProducts = cart.reduce((total, item) => total + item.quantity, 0)

  const updateOrderTotalPrice = () => {
    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
    setTotalPrice(totalPrice)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incrementProductQuantity,
        decrementProductQuantity,
        totalProducts,
        updateOrderTotalPrice,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export { CartProvider }
