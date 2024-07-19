import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import GestureRecognizer from 'react-native-swipe-gestures'
import { Grid } from '@components/Grid'
import { Score } from '@components/Score'
import { GESTURE_CONFIGS } from '@constants/initail'

import { moveDown, moveLeft, moveRight, moveUp } from '@/store/actions'
import {
	gameGridSelector,
	gameScoreSelector,
	gameBestScoreSelector,
} from '@/store'

export const GameView: FC = () => {
	const dispatch = useDispatch()

	const values = useSelector(gameGridSelector)
	const score = useSelector(gameScoreSelector)
	const bestScore = useSelector(gameBestScoreSelector)

	const onSwipeDown = () => dispatch(moveDown())
	const onSwipeUp = () => dispatch(moveUp())
	const onSwipeLeft = () => dispatch(moveLeft())
	const onSwipeRight = () => dispatch(moveRight())

	return (
		<View style={styles.screen}>
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
