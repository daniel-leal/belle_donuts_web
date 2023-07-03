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
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts()

        const formattedProducts = productsData.map(product => ({
          ...product,
          formattedPrice: formatPrice(product.price)
        }))

        setProducts(formattedProducts)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchData()
  }, [])

  const uniqueCategories = Array.from(
    new Set(products.map(product => product.category))
  )

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredCategories = Array.from(
    new Set(filteredProducts.map(product => product.category))
  )

  const getProductCards = (category: string) => {
    const productList = searchTerm.length > 0 ? filteredProducts : products

    return productList
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
      <Navbar categories={uniqueCategories} productRefs={productRefs} />
      <div className="bg-gray-200 min-h-screen">
        <HeroAvailability />
        <div className="container mx-auto py-8">
          <div
            className={`container  ${screenSize === 'sm' ? 'pr-3 pl-3' : ''}`}
          >
            <div className="relative">
              <span className="absolute flex items-center pl-2 pt-3">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-gray-400"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input
                type="search"
                placeholder="Buscar no cardápio..."
                className="input mb-5 input-bordered input-secondary rounded-md min-w-full pl-10"
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value)
                }}
              />
            </div>
          </div>

          {filteredCategories.map(category => (
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
