import React from 'react'

import { Product } from '@interfaces/Product'

type ProductCardProps = {
  product: Product
  screenSize: string
}

const ProductCard: React.FC<ProductCardProps> = ({ product, screenSize }) => {
  return (
    <div
      className={`${
        screenSize === 'sm'
          ? 'flex items-center mb-2'
          : 'bg-white rounded-lg shadow-md flex'
      }`}
    >
      {screenSize === 'sm' ? (
        <>
          <div className="flex-1">
            <h3 className="text-lg text-gray-700 mb-2">{product.name}</h3>
            {product.description && (
              <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                {product.description}
              </p>
            )}
            <p className="text-lg text-green-500">R$ {product.price}</p>
          </div>
          <img
            src={product.image_url}
            alt={product.name}
            className="object-cover w-1/4 h-24 mr-4"
          />
        </>
      ) : (
        <>
          <div className="w-4/5 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg text-gray-700 mb-2">{product.name}</h3>
              {product.description && (
                <p className="text-sm text-gray-500 mb-2">
                  {product.description}
                </p>
              )}
            </div>
            <p className="text-lg text-green-500">R$ {product.price}</p>
          </div>
          <div className="w-1/5">
            <img
              src={product.image_url}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
        </>
      )}
    </div>
  )
}

export default ProductCard
