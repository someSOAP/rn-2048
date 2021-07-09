import React, { FC, memo } from 'react'
import { View, StyleSheet } from 'react-native'
import BackGroundCell from '@components/BackGroundCell'

interface IBackGroundGridProps {
  size: number
}

const generateBackground = (size: number) => {
  const mapArr = new Array(size).fill(1)
  return (
    <View style={styles.backGround}>
      {mapArr.map((_, row) => {
        return (
          <View style={styles.row} key={row}>
            {mapArr.map((_, cell) => {
              return <BackGroundCell key={cell} />
            })}
          </View>
        )
      })}
    </View>
  )
}

export const BackGroundGrid: FC<IBackGroundGridProps> = ({ size }) => {
  return generateBackground(size)
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  backGround: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
})

export default memo(BackGroundGrid, (prev, next) => {
  return prev.size === next.size
})
