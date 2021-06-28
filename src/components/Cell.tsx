import React, { FC, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Animated,
  TouchableOpacity,
} from 'react-native'
import { vw } from '@constants/window'
import { CELL_DIMENSION } from '@constants/initail'
import { COLORS_MAP } from '@constants/colors'

interface ICellProps {
  value: number
}

const mapColor = (value: number): ViewStyle => {
  const backgroundColor = COLORS_MAP.get(value) ?? 'green'

  return { backgroundColor }
}

const ValueCell: FC<ICellProps> = ({ value }) => {
  const animVal = useRef(new Animated.Value(0)).current

  const startAnimate = () => {
    Animated.timing(animVal, {
      toValue: 100,
      useNativeDriver: true,
      duration: 250,
    }).start()
  }

  const style = Object.assign({}, styles.cell, mapColor(value), {
    transform: [
      {
        translateY: animVal.interpolate({
          inputRange: [0, 100],
          outputRange: [0, CELL_DIMENSION + 2 * vw],
        }),
      },
    ],
  })

  return (
    <TouchableOpacity onPress={startAnimate}>
      <Animated.View style={style}>
        <Text style={styles.cellText}>{value || ''}</Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

export const Cell: FC<ICellProps> = ({ value }) => {
  return (
    <View style={styles.backgroundCell}>
      {value ? <ValueCell value={value} /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundCell: {
    borderRadius: 12,
    width: CELL_DIMENSION,
    height: CELL_DIMENSION,
    margin: vw,
    backgroundColor: 'rgba(238, 228, 218, 0.35)',
  },
  cell: {
    borderRadius: 8,
    width: CELL_DIMENSION,
    height: CELL_DIMENSION,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 8 * vw,
  },
})

export default Cell
