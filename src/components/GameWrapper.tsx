import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'
import { WHITE } from '@constants/colors'
import { Header } from './Header'
import { GameView } from './GameView'

export const GameWrapper: FC = () => {
  return (
    <View style={styles.gameWrapper}>
      <Header />
      <GameView />
    </View>
  )
}

const styles = StyleSheet.create({
  gameWrapper: {
    flex: 1,
    backgroundColor: WHITE,
  },
})

export default GameWrapper
