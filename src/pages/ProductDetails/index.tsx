import Navbar from '@components/Navbar'
import useScreenSize from '@hooks/useScreenSize'
import { formatPrice } from '@utils/utils'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const ProductDetails = () => {
  const screenSize = useScreenSize()
  const location = useLocation()
  const navigate = useNavigate()
  const product = location.state?.product
  const [quantity, setQuantity] = useState(1)
  const [total, setTotal] = useState('')

  useEffect(() => {
    setTotal(formatPrice(product.price))
  }, [])

  const handleGoBack = () => {
    navigate(-1)
  }

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

  const MobileView = () => (
    <>
      <Navbar showGoBack={true} handleGoBack={handleGoBack} />
      <div className="container mx-auto">
        <div className="flex mx-5 justify-center items-center flex-col">
          <img
            src={product.image_url}
            alt={product.name}
            className="object-cover rounded-md h-60 w-60 mt-4"
          />
          <h2 className="text-5xl p-5 text-secondary-focus font-bold">
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
        <button className="bg-secondary text-white px-4 py-2 rounded-md">
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
          <Navbar showGoBack={true} handleGoBack={handleGoBack} />
          <div className="mx-auto container mt-11 shadow-2xl bg-white rounder-lg flex flex-row p-4 gap-4 w-full">
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
                <button className="bg-secondary text-white px-4 py-2 rounded-md">
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
