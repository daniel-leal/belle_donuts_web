import React from 'react'

import { Product } from '@interfaces/Product'
import { useNavigate } from 'react-router-dom'

type ProductCardProps = {
  product: Product
  screenSize: string
}

const ProductCard: React.FC<ProductCardProps> = ({ product, screenSize }) => {
  const navigate = useNavigate()

  const handleProductDetailsNavigate = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault()
    navigate(`/products/${product.id}`, { state: { product } })
  }

  const MobileListView = () => (
    <>
      <div className="flex-1">
        <h3 className="text-lg text-gray-700 mb-2">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-gray-500 mb-2 line-clamp-2">
            {product.description}
          </p>
        )}
        <p className="text-lg text-green-500">{product.formattedPrice}</p>
      </div>
      <img
        src={product.image_url}
        alt={product.name}
        className="object-cover w-1/4 h-24 mr-4"
      />
    </>
  )

  const CardView = () => (
    <>
      <div className="w-4/5 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg text-gray-700 mb-2">{product.name}</h3>
          {product.description && (
            <p className="text-sm text-gray-500 mb-2">{product.description}</p>
          )}
        </div>
        <p className="text-lg text-green-500">{product.formattedPrice}</p>
      </div>
      <div className="w-1/5">
        <img
          src={product.image_url}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>
    </>
  )

  return (
    <div
      className={`${
        screenSize === 'sm'
          ? 'flex items-center mb-2'
          : 'bg-white rounded-lg shadow-md flex'
      } cursor-pointer hover:bg-opacity-30 transition-colors duration-500`}
      onClick={handleProductDetailsNavigate}
    >
      {screenSize === 'sm' ? <MobileListView /> : <CardView />}
    </div>
  )
}

export default ProductCard
