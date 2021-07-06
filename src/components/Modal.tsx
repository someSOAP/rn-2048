import React, { FC } from 'react'
import { View, StyleSheet, Modal as RNModal } from 'react-native'
import mixins from '@utils/mixins'
import CustomButton from './CustomButton'
import { vw } from '@constants/window'

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
          <CustomButton onPress={onPlay}>PLAY</CustomButton>
          <CustomButton onPress={onReset}>RESET</CustomButton>
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
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  content: {
    ...mixins.border,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'gray',
    height: 80 * vw,
    width: 80 * vw,
  },
})

export default Modal
