import Footer from '@components/Footer'
import HeroAvailability from '@components/HeroAvailability'
import Navbar from '@components/Navbar'
import ProductCard from '@components/ProductCard'
import useScreenSize from '@hooks/useScreenSize'
import { Product } from '@interfaces/Product'
import { fetchProducts } from '@services/DeliveryServices'
import { formatPrice } from '@utils/utils'
import React, { useEffect, useRef, useState } from 'react'

type ProductListProps = {
  category: string
}

const Home: React.FC = () => {
  const screenSize = useScreenSize()
  const productRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const [categories, setCategories] = useState<string[]>([])
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts()

        const formattedProducts = productsData.map(product => ({
          ...product,
          formattedPrice: formatPrice(product.price)
        }))

        const uniqueCategories = Array.from(
          new Set(productsData.map(product => product.category))
        )
        setCategories(uniqueCategories)
        setProducts(formattedProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchData()
  }, [])

  const getProductCards = (category: string) => {
    return products
      .filter(product => product.category === category)
      .map((product, index) => (
        <React.Fragment key={product.id}>
          {screenSize === 'sm' && index > 0 && (
            <hr className="border-gray-300 my-4" />
          )}
          <ProductCard product={product} screenSize={screenSize} />
        </React.Fragment>
      ))
  }

  const ProductsMobileList: React.FC<ProductListProps> = ({ category }) => (
    <div>{getProductCards(category)}</div>
  )

  const ProductsList: React.FC<ProductListProps> = ({ category }) => (
    <div className="grid grid-cols-2 gap-4">{getProductCards(category)}</div>
  )

  return (
    <>
      <Navbar categories={categories} productRefs={productRefs} />
      <div className="bg-gray-200 min-h-screen">
        <HeroAvailability />
        <div className="container mx-auto py-8">
          {categories.map(category => (
            <div
              key={category}
              ref={ref => (productRefs.current[category] = ref)}
              className={screenSize === 'sm' ? 'bg-white p-4 mb-4' : ''}
            >
              <h2 className={`text-2xl text-neutral mb-4 mt-8`}>{category}</h2>
              <hr className="border-gray-300 my-4" />
              {screenSize === 'sm' ? (
                <ProductsMobileList category={category} />
              ) : (
                <ProductsList category={category} />
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
