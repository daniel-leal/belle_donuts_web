import useCart from '@hooks/useCart'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

type NavbarProps = {
  categories?: string[]
  productRefs?: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>
  showGoBack?: boolean
  handleGoBack?: () => void
}

export default function Navbar({
  categories = [],
  productRefs,
  showGoBack = false
}: NavbarProps) {
  const navigate = useNavigate()
  const { totalProducts } = useCart()

  const handleTabChange = (category: string) => {
    if (productRefs?.current) {
      const selectedProductRef = productRefs.current[category]
      if (selectedProductRef) {
        window.scrollTo({
          top: selectedProductRef.offsetTop - 100,
          behavior: 'smooth'
        })
      }
    }
  }

  const handleGoBack = () => {
    navigate('/')
  }

  return (
    <div className="navbar bg-secondary fixed top-0 z-50">
      <div className="flex-1">
        {showGoBack && (
          <a
            className="btn btn-ghost normal-case text-xl text-white"
            onClick={handleGoBack}
          >
            ⏎
          </a>
        )}
      </div>
      {!showGoBack && (
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
                <li
                  key={category}
                  onClick={() => {
                    handleTabChange(category)
                  }}
                >
                  <button className="text-white">{category}</button>
                </li>
              ))}
            </ul>
          </div>
          <label
            tabIndex={0}
            className="text-white font-extrabold from-accent-content font-sans"
          >
            LA BELLE DONUTS
          </label>
        </div>
      )}

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal menu-lg px-1">
          {categories.map(category => (
            <li
              key={category}
              onClick={() => {
                handleTabChange(category)
              }}
              className="hover:text-white text-white btn btn-ghost"
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <NavLink tabIndex={0} className="btn btn-ghost btn-circle" to={'/cart'}>
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
            <span className="badge badge-sm indicator-item">
              {totalProducts}
            </span>
          </div>
        </NavLink>
      </div>
    </div>
  )
}
