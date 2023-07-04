import useCart from '@hooks/useCart'
import useScreenSize from '@hooks/useScreenSize'
import { formatPrice } from '@utils/utils'

function CartProducts() {
  const {
    cart,
    totalPrice,
    totalProducts,
    removeFromCart,
    incrementProductQuantity,
    decrementProductQuantity
  } = useCart()
  const screenSize = useScreenSize()

  const MobileView = () => {
    return (
      <>
        {cart.map(product => (
          <div key={product.id} className="flex flex-row gap-3 py-2">
            <img src={product.image_url} className="object-coverz w-20" />

            <div className="flex flex-col justify-between w-full">
              <span className="font-semibold text-neutral text-xs">
                {product.name}
              </span>

              <div className="flex flex-row justify-between">
                <span className="text-success font-semibold text-lg">
                  {formatPrice(product.price * product.quantity)}
                </span>

                <div className="flex justify-between gap-3 border shadow p-2 rounded-lg">
                  {product.quantity === 1 ? (
                    <label
                      className="text-error"
                      onClick={() => {
                        removeFromCart(product.id)
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </label>
                  ) : (
                    <button
                      className="btn btn-accent btn-xs rounded-lg text-white font-bold"
                      onClick={() => {
                        decrementProductQuantity(product.id)
                      }}
                    >
                      -
                    </button>
                  )}

                  <span className="text-lg">{product.quantity}</span>
                  <button
                    className="btn bg-accent btn-xs rounded-lg text-white font-bold"
                    onClick={() => {
                      incrementProductQuantity(product.id)
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="alert rounded-lg mt-20">
          <span className="font-semibold">
            Total: {formatPrice(totalPrice)}
          </span>
        </div>
      </>
    )
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-2xl text-primary-focus font-semibold">
        Meu Carrinho
      </h1>
      <div className="divider"></div>
      {cart.length > 0 ? (
        <>
          {screenSize === 'sm' ? (
            <MobileView />
          ) : (
            <div className="overflow-x-auto mt-10">
              <table className="table table-lg">
                <colgroup>
                  <col style={{ width: '40%' }} />
                  <col style={{ width: '15%' }} />
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '20%' }} />
                  <col style={{ width: '5%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th className="flex justify-center">Quantidade</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {cart.map(product => (
                    <tr
                      key={product.id}
                      className="transition duration-700 ease-in-out"
                    >
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={product.image_url}
                                alt="Product Image"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>{product.formattedPrice}</td>
                      <td>
                        <div className="flex flex-row justify-evenly items-baseline">
                          <button
                            className="btn btn-accent btn-xs text-white font-bold rounded-lg"
                            onClick={() => {
                              decrementProductQuantity(product.id)
                            }}
                          >
                            -
                          </button>
                          {product.quantity}
                          <button
                            className="btn btn-accent btn-xs text-white font-bold rounded-lg"
                            onClick={() => {
                              incrementProductQuantity(product.id)
                            }}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{formatPrice(product.price * product.quantity)}</td>
                      <th>
                        <button
                          className="btn btn-outline btn-secondary rounded-lg"
                          onClick={() => {
                            removeFromCart(product.id)
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </th>
                    </tr>
                  ))}
                  <tr className="bg-base-200">
                    <td className="font-bold">Total</td>
                    <td></td>
                    <td className="font-semibold flex flex-row justify-evenly items-center">
                      {totalProducts}
                    </td>
                    <td className="font-bold">{formatPrice(totalPrice)}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <div className="container mx-auto px-4">
          <div className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Seu Carrinho está vazio!</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartProducts
