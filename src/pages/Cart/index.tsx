import Navbar from '@components/Navbar'
import { useState } from 'react'
import CartProducts from './CartProducts'

function Cart() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = ['Carrinho', 'Contato', 'Confirmação']

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
  }

  return (
    <>
      <Navbar showGoBack={true} />

      <div className="container mx-auto mt-16">
        <div className="flex justify-center items-center pt-10">
          <ul className="steps md:w-2/3 lg:w-2/3">
            {steps.map((step, index) => (
              <li
                key={index}
                className={`step ${index <= currentStep ? 'step-primary' : ''}`}
              >
                {step}
              </li>
            ))}
          </ul>
        </div>

        <CartProducts />

        <div className="flex justify-between mt-5 px-4 pb-5">
          <button
            className="btn rounded-md"
            disabled={currentStep === 0}
            onClick={() => {
              handleStepClick(currentStep - 1)
            }}
          >
            Voltar
          </button>
          <button
            className="btn btn-primary rounded-md"
            onClick={() => {
              handleStepClick(currentStep + 1)
            }}
          >
            Continuar
          </button>
        </div>
      </div>
    </>
  )
}

export default Cart
