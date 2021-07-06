import React, { FC, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import GestureRecognizer from 'react-native-swipe-gestures'
import { AsyncStorage } from 'react-native'

import {
  gameGridSelector,
  gameIsOverSelector,
  gameScoreSelector,
  gameBestScoreSelector,
  gameVisibleModalSelector,
  setBestScore,
  setVisibleModal,
} from '@/store'
import {
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  startNewGame,
} from '@/store/actions'
import CustomButton from '@components/CustomButton'
import { Grid } from '@components/Grid'
import { Modal } from '@components/Modal'
import { Score } from '@components/Score'
import { GESTURE_CONFIGS, BEST_SCORE_KEY } from '@constants/initail'

const GameView: FC = () => {
  const dispatch = useDispatch()

  const values = useSelector(gameGridSelector)
  const isOver = useSelector(gameIsOverSelector)
  const score = useSelector(gameScoreSelector)
  const bestScore = useSelector(gameBestScoreSelector)
  const visibleModal = useSelector(gameVisibleModalSelector)

  useEffect(() => {
    restart()

    AsyncStorage.getItem(BEST_SCORE_KEY).then((bestScoreStr) => {
      if (bestScoreStr) {
        dispatch(setBestScore(parseInt(bestScoreStr)))
      }
    })
  }, [])

  const toggleModal = () => dispatch(setVisibleModal(!visibleModal))
  const restart = () => dispatch(startNewGame())
  const onSwipeDown = () => dispatch(moveDown())
  const onSwipeUp = () => dispatch(moveUp())
  const onSwipeLeft = () => dispatch(moveLeft())
  const onSwipeRight = () => dispatch(moveRight())

  return (
    <View style={styles.screen}>
      <CustomButton onPress={toggleModal}>SHOW MODAL</CustomButton>
      <Modal
        isVisible={visibleModal || isOver}
        onPlay={toggleModal}
        onReset={restart}
      />
      <View style={styles.scorePanel}>
        <Score score={score} />
        <Score score={bestScore} />
      </View>
      <GestureRecognizer
        onSwipeDown={onSwipeDown}
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        onSwipeUp={onSwipeUp}
        config={GESTURE_CONFIGS}
      >
        <Grid values={values} />
      </GestureRecognizer>
    </View>
  )
}

const styles = StyleSheet.create({
  scorePanel: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 30,
  },
  screen: {
    backgroundColor: 'rgb(250, 248, 239)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default GameView
