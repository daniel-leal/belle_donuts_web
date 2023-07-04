import { OperatingHours } from '@interfaces/OperatingHours'
import { fetchOperatingHours } from '@services/DeliveryServices'
import { isOperatingTime } from '@utils/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import React, { useEffect, useState } from 'react'

const HeroAvailability: React.FC = () => {
  const [operatingHours, setOperatingHours] = useState<OperatingHours[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchOperatingHours()
        setOperatingHours(response)
      } catch (error) {
        console.error('Error fetching hours:', error)
      }
    }

    fetchData()
  }, [])

  const isOpen = isOperatingTime(operatingHours)

  const onlineText = `
  Bem-vindos à nossa La Belle Donuts! Estamos abertos e prontos para
  adoçar o seu dia. Faça seu pedido via delivery e saboreie nossas
  delícias no conforto da sua casa.
  `

  const offlineText = `
  Agradecemos pela visita à La Belle Donuts! Informamos que nossa loja está
  temporariamente fechada.  Em breve estaremos de volta! Acompanhe-nos nas redes
  sociais para ficar atualizado. Até breve!
  `

  const currentDay = format(new Date(), 'EEEE', { locale: ptBR })

  const heroBackgroundStyle = {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1533910534207-90f31029a78e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80)',
    backgroundSize: 'cover'
  }

  return (
    <>
      <div className="hero min-w-screen mt-16" style={heroBackgroundStyle}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md m-10">
            <div className={`avatar ${isOpen ? 'online' : 'offline'}`}>
              <div className="w-24 rounded-full">
                <img
                  src="https://static.ifood-static.com.br/image/upload/t_thumbnail/logosgde/f58541e0-1c5a-404a-843c-b7e817fdd08d/202305221353_PctM_i.jpg"
                  alt="logo"
                />
              </div>
            </div>
            <p className="mb-5">{isOpen ? onlineText : offlineText}</p>
            <button
              className="btn btn-primary"
              onClick={() => window.operating_hour_modal.show()}
            >
              Horários de Funcionamento
            </button>
          </div>
        </div>
      </div>

      <dialog id="operating_hour_modal" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-md text-center pb-5">Funcionamento</h3>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Dia</th>
                  <th>Abertura</th>
                  <th>Fechamento</th>
                </tr>
              </thead>
              <tbody>
                {operatingHours.map(operatingHour => (
                  <tr
                    key={operatingHour.day}
                    className={
                      currentDay === operatingHour.day
                        ? 'bg-primary text-white'
                        : ''
                    }
                  >
                    <td>{operatingHour.day}</td>
                    <td>{operatingHour.operating_time}</td>
                    <td>{operatingHour.closing_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}

export default HeroAvailability
