import React, { FC, useRef } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MILKY } from '@constants/colors'
import mixins from '@utils/mixins'
import { vw } from '@constants/window'
import { AnimatedDiff } from './AnimatedDiff'
interface IScoreRef {
  value: number
}

interface IScoreProps {
  score: number
}

export const Score: FC<IScoreProps> = ({ score }) => {
  const prevScore = useRef<IScoreRef>({ value: score }).current

  const diff = score - prevScore.value

  prevScore.value = score

  return (
    <View style={styles.score}>
      <Text style={styles.text}>{score}</Text>
      <AnimatedDiff diff={diff} />
    </View>
  )
}

const styles = StyleSheet.create({
  score: {
    ...mixins.border,
    padding: 10,
    width: 30 * vw,
    backgroundColor: MILKY,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
})

export default Score
