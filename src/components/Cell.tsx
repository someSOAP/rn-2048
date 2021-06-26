import React, { FC } from 'react'
import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import { vw } from '@constants/window'

interface ICellProps {
  value: number
}

export const Cell: FC<ICellProps> = ({ value }) => {
  const style = Object.assign(
    {},
    styles.cell,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    styles[String(value)] as ViewStyle
  )

  return (
    <View style={style}>
      <Text style={styles.cellText}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  cell: {
    borderRadius: 8,
    width: 20 * vw,
    height: 20 * vw,
    backgroundColor: 'rgba(238,228,218, 0.35)',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: vw,
  },
  cellText: {
    fontSize: 8 * vw,
  },
  ['2']: {
    backgroundColor: 'white',
  },
  ['4']: {
    backgroundColor: 'gray',
  },
  ['8']: {
    backgroundColor: 'orange',
  },
  ['16']: {
    backgroundColor: 'red',
  },
})

export default Cell
