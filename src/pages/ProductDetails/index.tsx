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
      <NavBar />
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

  const NavBar = () => (
    <div className="navbar bg-secondary">
      <div className="flex-1">
        <a
          className="btn btn-ghost normal-case text-xl text-white"
          onClick={() => {
            handleGoBack()
          }}
        >
          ⏎
        </a>
      </div>
      <div className="navbar-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm indicator-item">8</span>
          </div>
        </label>
      </div>
    </div>
  )

  return (
    <>
      {screenSize === 'sm' ? (
        <MobileView />
      ) : (
        <>
          <NavBar />
          <div className="md:container mx-auto py-4 px-20">
            <div className="flex flex-row justify-between mx-40 p-2 gap-4 shadow-lg bg-white rounded-lg">
              <img
                src={product.image_url}
                alt={product.name}
                className="object-cover rounded-md"
              />
              <div className="flex flex-col justify-between">
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
          </div>
        </>
      )}
    </>
  )
}

export default ProductDetails
