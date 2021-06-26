import { useEffect, useState } from 'react'
import { Dimensions, ScaledSize } from 'react-native'

export const useWindow = (): ScaledSize => {
  const [window, setWindow] = useState(Dimensions.get('window'))

  useEffect(() => {
    const onChange = () => {
      setWindow(Dimensions.get('window'))
    }

    Dimensions.addEventListener('change', onChange)

    return () => {
      Dimensions.removeEventListener('change', onChange)
    }
  }, [])

  return window
}

export default useWindow
