import Navbar from '@components/Navbar'
import useCart from '@hooks/useCart'
import useScreenSize from '@hooks/useScreenSize'
import { formatPrice } from '@utils/utils'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ProductDetails = () => {
  const screenSize = useScreenSize()
  const location = useLocation()
  const product = location.state?.product
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const [total, setTotal] = useState('')
  const { addToCart } = useCart()

  useEffect(() => {
    setTotal(formatPrice(product.price))
  }, [])

  const handleAddQuantity = () => {
    if (quantity < 99) {
      const newQuantity = quantity + 1
      setQuantity(newQuantity)

      const newTotal = newQuantity * product.price
      setTotal(formatPrice(newTotal))
    }
  }

  const handleSubQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)

      const newTotal = newQuantity * product.price

      setTotal(formatPrice(newTotal))
    }
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    navigate('/cart')
  }

  const MobileView = () => (
    <>
      <Navbar showGoBack />
      <div className="container mx-auto px-4">
        <div className="flex mx-5 justify-center items-center flex-col mt-16">
          <img
            src={product.image_url}
            alt={product.name}
            className="object-cover rounded-md h-60 w-60 mt-4"
          />
          <h2 className="text-5xl p-5 text-secondary-focus font-bold text-center">
            {product.name}
          </h2>
          <p className="text-gray-500 text-justify mt-2">
            {product.description}
          </p>
        </div>
      </div>

      <footer className="fixed bottom-0 items-baseline left-0 right-0 bg-white border-t border-gray-300 p-4 flex justify-between">
        <div className="flex items-center">
          <button
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md"
            onClick={() => {
              handleSubQuantity()
            }}
          >
            -
          </button>
          <span className="mx-2 font-semibold">{quantity}</span>
          <button
            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md"
            onClick={() => {
              handleAddQuantity()
            }}
          >
            +
          </button>
        </div>
        <div className="text-gray-700">
          <span className="font-bold text-green-600">{total}</span>
        </div>
        <button
          className="btn btn-secondary rounded-md"
          onClick={handleAddToCart}
        >
          Adicionar
        </button>
      </footer>
    </>
  )

  return (
    <>
      {screenSize === 'sm' ? (
        <MobileView />
      ) : (
        <>
          <Navbar showGoBack />
          <div className="mx-auto container mt-24 shadow-2xl bg-white rounder-lg flex flex-row p-4 gap-4 w-full">
            <img
              src={product.image_url}
              alt={product.name}
              className="object-contain h-64 rounded-md responsive"
            />
            <div className="flex flex-col justify-between w-full">
              <h2 className="text-5xl text-secondary-focus font-bold">
                {product.name}
              </h2>
              <p className="text-gray-500 text-xxl mt-2">
                {product.description}
              </p>
              <div className="flex justify-between items-baseline bg-gray-100 rounded-md p-2">
                <div className="flex items-center">
                  <button
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                    onClick={() => {
                      handleSubQuantity()
                    }}
                  >
                    -
                  </button>
                  <span className="mx-2 font-semibold">{quantity}</span>
                  <button
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                    onClick={() => {
                      handleAddQuantity()
                    }}
                  >
                    +
                  </button>
                </div>
                <div className="text-gray-700">
                  <span className="font-bold text-green-600">{total}</span>
                </div>
                <button
                  className="btn btn-secondary text-white rounded-md"
                  onClick={handleAddToCart}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ProductDetails
