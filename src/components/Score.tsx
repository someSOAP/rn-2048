import React, { FC, useRef } from 'react'
import { View, StyleSheet } from 'react-native'

import { CELL_COLOR, MILKY, TEXT_DARK } from '@constants/colors'
import mixins from '@utils/mixins'
import { vw } from '@constants/window'
import { Ionicons } from '@expo/vector-icons'

import { AnimatedDiff } from './AnimatedDiff'
import { CustomText } from './CustomText'
interface IScoreRef {
	value: number
}

interface IScoreProps {
	score: number
	icon?: string
}

export const Score: FC<IScoreProps> = ({ score, icon }) => {
	const prevScore = useRef<IScoreRef>({ value: score }).current

	const diff = score - prevScore.value

	prevScore.value = score

	return (
		<View style={styles.score}>
			<CustomText style={styles.text}>{score}</CustomText>
			<AnimatedDiff diff={diff} />
			<Ionicons name={icon as any} size={20} color={TEXT_DARK} />
		</View>
	)
}

const styles = StyleSheet.create({
	score: {
		...mixins.border,
		padding: 10,
		width: 30 * vw,
		backgroundColor: CELL_COLOR,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	text: {
		fontSize: 20,
		textAlign: 'center',
	},
})

export default Score
