import React, { FC } from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '@components/IconButton'
import { gameVisibleModalSelector, setVisibleModal } from '@/store'

export const Header: FC = () => {
  const dispatch = useDispatch()

  const visibleModal = useSelector(gameVisibleModalSelector)

  const toggleModal = () => dispatch(setVisibleModal(!visibleModal))

  return (
    <View style={styles.header}>
      <IconButton onPress={toggleModal} icon="menu" />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    width: '100%',
    paddingTop: StatusBar.currentHeight,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
  },
})

export default Header
