import React, { FC } from 'react'
import { View, StyleSheet, Modal as RNModal } from 'react-native'
import mixins from '@utils/mixins'
import { vw } from '@constants/window'
import { GRID_COLOR } from '@constants/colors'
import { IconButton } from './IconButton'

interface IModalProps {
  isVisible: boolean
  onPlay: () => void
  onReset: () => void
}

export const Modal: FC<IModalProps> = ({ isVisible, onPlay, onReset }) => {
  return (
    <RNModal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.wrapper}>
        <View style={styles.content}>
          <IconButton onPress={onPlay} icon="play-outline" />
          <IconButton onPress={onReset} icon="refresh-outline" />
        </View>
      </View>
    </RNModal>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  content: {
    elevation: 30,
    ...mixins.border,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 3 * vw,
    borderColor: GRID_COLOR,
    backgroundColor: GRID_COLOR,
    height: 80 * vw,
    width: 80 * vw,
  },
})

export default Modal
