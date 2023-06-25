import { useEffect, useState } from 'react'

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState('')

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth
      let currentScreenSize = ''
      if (screenWidth >= 768) {
        currentScreenSize = 'lg'
      } else if (screenWidth >= 576) {
        currentScreenSize = 'md'
      } else {
        currentScreenSize = 'sm'
      }
      setScreenSize(currentScreenSize)
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return screenSize
}

export default useScreenSize
