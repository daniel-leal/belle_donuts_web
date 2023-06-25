import React, { useEffect, useRef, useState } from 'react'

import Footer from '../../components/Footer'
import ProductCard from '../../components/ProductCard'
import useScreenSize from '../../hooks/useScreenSize'
import { Product } from '../../interfaces/Product'
import { fetchProducts } from '../../services/ProductService'

const Home: React.FC = () => {
  const screenSize = useScreenSize()
  const productRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const [categories, setCategories] = useState<string[]>([])
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await fetchProducts()
        const uniqueCategories = Array.from(
          new Set(productsData.map(product => product.category))
        )
        setCategories(uniqueCategories)
        setProducts(productsData)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchData()
  }, [])

  const handleTabChange = (category: string) => {
    const selectedProductRef = productRefs.current[category]
    if (selectedProductRef) {
      window.scrollTo({
        top: selectedProductRef.offsetTop - 100,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <div className="navbar fixed bg-secondary">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content mt-3 z-[1] p-2 shadow bg-secondary rounded-box w-52"
            >
              {categories.map(category => (
                <li key={category} onClick={() => handleTabChange(category)}>
                  <button className="text-white">{category}</button>
                </li>
              ))}
            </ul>
          </div>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full ring ring-secondary-focus ring-offset-base-100 ring-offset-2">
              <img
                src="https://static.ifood-static.com.br/image/upload/t_thumbnail/logosgde/f58541e0-1c5a-404a-843c-b7e817fdd08d/202305221353_PctM_i.jpg"
                alt="logo"
              />
            </div>
          </label>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal menu-lg px-1">
            {categories.map(category => (
              <li
                key={category}
                onClick={() => handleTabChange(category)}
                className="hover:text-white text-white btn btn-ghost"
              >
                {category}
              </li>
            ))}
          </ul>
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
      <div className="bg-gray-200 pt-16 min-h-screen">
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
                <div>
                  {products
                    .filter(product => product.category === category)
                    .map((product, index) => (
                      <div key={product.id}>
                        {index > 0 && <hr className="border-gray-300 my-4" />}
                        <ProductCard
                          product={product}
                          screenSize={screenSize}
                        />
                      </div>
                    ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {products
                    .filter(product => product.category === category)
                    .map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        screenSize={screenSize}
                      />
                    ))}
                </div>
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
