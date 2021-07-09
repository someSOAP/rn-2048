import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, Modal as RNModal } from 'react-native'
import mixins from '@utils/mixins'
import { vw } from '@constants/window'
import { GRID_COLOR, MILKY, TEXT_BRIGHT } from '@constants/colors'
import { CELL_DIMENSION } from '@constants/initail'
import { IconButton } from './IconButton'
import { CustomText } from './CustomText'
import {
  gameModalTextSelector,
  gameVisibleModalSelector,
  gameIsOverSelector,
  setVisibleModal,
} from '@/store'
import { startNewGame } from '@/store/actions'

export const Modal: FC = () => {
  const dispatch = useDispatch()
  const visibleModal = useSelector(gameVisibleModalSelector)
  const isOver = useSelector(gameIsOverSelector)
  const text = useSelector(gameModalTextSelector)

  const toggleModal = () => dispatch(setVisibleModal(!visibleModal))
  const restart = () => dispatch(startNewGame())

  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={visibleModal || isOver}
    >
      <View style={styles.wrapper}>
        <View style={styles.content}>
          {text && <CustomText style={styles.modalText}>{text}</CustomText>}
          <View style={styles.buttonsRow}>
            {!isOver && (
              <IconButton
                onPress={toggleModal}
                style={styles.button}
                icon="play-outline"
              />
            )}
            <IconButton
              onPress={restart}
              style={styles.button}
              icon="refresh-outline"
            />
          </View>
        </View>
      </View>
    </RNModal>
  )
}

const styles = StyleSheet.create({
  modalText: {
    textAlign: 'center',
    fontSize: CELL_DIMENSION,
    color: TEXT_BRIGHT,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  button: {
    width: 1.2 * CELL_DIMENSION,
    height: 1.2 * CELL_DIMENSION,
    justifyContent: 'center',
    alignItems: 'center',
    ...mixins.border,
    backgroundColor: MILKY,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  content: {
    elevation: 30,
    ...mixins.border,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: GRID_COLOR,
    height: 80 * vw,
    width: 80 * vw,
    padding: 5 * vw,
  },
})

export default Modal
