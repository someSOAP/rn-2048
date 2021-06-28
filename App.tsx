import React, { FC } from 'react'
import { Provider } from 'react-redux'
import GameView from '@components/GameView'
import store from '@/store'

const App: FC = () => {
  return (
    <Provider store={store}>
      <GameView />
    </Provider>
  )
}

export default App
