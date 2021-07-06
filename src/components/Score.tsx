import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MILKY } from '@constants/colors'
import mixins from '@utils/mixins'
import { vw } from '@constants/window'

interface IScoreProps {
  score: number
}

export const Score: FC<IScoreProps> = ({ score }) => {
  return (
    <View style={styles.score}>
      <Text style={styles.text}>{score}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  score: {
    ...mixins.border,
    padding: 10,
    width: 30 * vw,
    backgroundColor: MILKY,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
})

export default Score
