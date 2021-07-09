import React, { FC, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import GestureRecognizer from 'react-native-swipe-gestures'
import { AsyncStorage } from 'react-native'

import {
  setGameState,
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
import { Grid } from '@components/Grid'
import { Modal } from '@components/Modal'
import { Score } from '@components/Score'
import {
  GESTURE_CONFIGS,
  BEST_SCORE_KEY,
  GAME_SATE_KEY,
} from '@constants/initail'

export const GameView: FC = () => {
  const dispatch = useDispatch()

  const values = useSelector(gameGridSelector)
  const isOver = useSelector(gameIsOverSelector)
  const score = useSelector(gameScoreSelector)
  const bestScore = useSelector(gameBestScoreSelector)
  const visibleModal = useSelector(gameVisibleModalSelector)

  useEffect(() => {
    AsyncStorage.getItem(GAME_SATE_KEY)
      .then((stateStr) => {
        if (!stateStr) {
          restart()
          return void 0
        }
        try {
          const lastState = JSON.parse(stateStr)
          dispatch(setGameState(lastState))
        } catch (err) {
          restart()
        }
      })
      .catch(() => {
        AsyncStorage.getItem(BEST_SCORE_KEY).then((bestScoreStr) => {
          if (bestScoreStr) {
            dispatch(setBestScore(parseInt(bestScoreStr)))
          }
        })
        restart()
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
      <Modal
        isVisible={visibleModal || isOver}
        onPlay={toggleModal}
        onReset={restart}
      />
      <View style={styles.scorePanel}>
        <Score score={score} icon="chevron-up-outline" />
        <Score score={bestScore} icon="trophy-outline" />
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
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})

export default GameView
