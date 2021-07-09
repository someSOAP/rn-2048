import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, Text } from 'react-native'
import { TEXT_DARK, WHITE } from '@constants/colors'
import { gameIsLoadedSelector } from '@/store'
import { Header } from './Header'
import { GameView } from './GameView'
import { Modal } from './Modal'

import { loadGame } from '@/store/actions'

export const GameWrapper: FC = () => {
  const dispatch = useDispatch()
  const isLoaded = useSelector(gameIsLoadedSelector)

  useEffect(() => {
    dispatch(loadGame())
  }, [])

  if (!isLoaded) {
    return (
      <View style={styles.preloadWrapper}>
        <Text style={styles.preloadText}>...</Text>
      </View>
    )
  }

  return (
    <View style={styles.gameWrapper}>
      <Header />
      <Modal />
      <GameView />
    </View>
  )
}

const styles = StyleSheet.create({
  preloadWrapper: {
    backgroundColor: WHITE,
    flex: 1,
    justifyContent: 'center',
  },
  preloadText: {
    color: TEXT_DARK,
    fontSize: 40,
    textAlign: 'center',
  },
  gameWrapper: {
    flex: 1,
    backgroundColor: WHITE,
  },
})

export default GameWrapper
