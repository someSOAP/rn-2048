import React, { FC } from 'react'
import { Provider } from 'react-redux'
import GameWrapper from '@components/GameWrapper'
import store from '@/store'

const App: FC = () => {
  return (
    <Provider store={store}>
      <GameWrapper />
    </Provider>
  )
}

export default App
