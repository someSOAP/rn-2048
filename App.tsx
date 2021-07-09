import React, { FC, useState } from 'react'
import { Provider } from 'react-redux'
import { loadAsync } from 'expo-font'
import AppLoading from 'expo-app-loading'
import GameWrapper from '@components/GameWrapper'
import store from '@/store'
import { FREDOKA_FONT } from '@constants/initail'

const fetchFonts = () => {
  return loadAsync({
    [FREDOKA_FONT]: require('./assets/FredokaOne-Regular.ttf'),
  })
}

const App: FC = () => {
  const [dataLoading, setDataLoaded] = useState<boolean>(false)

  if (!dataLoading) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onError={console.error}
        onFinish={() => setDataLoaded(true)}
      />
    )
  }

  return (
    <Provider store={store}>
      <GameWrapper />
    </Provider>
  )
}

export default App
