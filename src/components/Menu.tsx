import React, { FC } from 'react'
import {
	View,
	StyleSheet,
	Modal,
	TouchableWithoutFeedback,
	GestureResponderEvent,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import mixins from '@utils/mixins'
import { vw } from '@constants/window'
import { GRID_COLOR, MILKY, TEXT_BRIGHT } from '@constants/colors'
import { CELL_DIMENSION } from '@constants/initail'

import {
	gameModalTextSelector,
	gameVisibleModalSelector,
	gameIsOverSelector,
	setVisibleModal,
} from '@/store'
import { startNewGame } from '@/store/actions'

import { IconButton } from './IconButton'
import { CustomText } from './CustomText'

export const Menu: FC = () => {
	const dispatch = useDispatch()
	const visibleModal = useSelector(gameVisibleModalSelector)
	const isOver = useSelector(gameIsOverSelector)
	const text = useSelector(gameModalTextSelector)

	const toggleModal = () => dispatch(setVisibleModal(!visibleModal))
	const restart = () => dispatch(startNewGame())
	const onEmptySpacePress = (ev: GestureResponderEvent) => {
		if (ev.currentTarget === ev.target) {
			toggleModal()
		}
	}

	return (
		<Modal
			animationType="fade"
			transparent
			visible={visibleModal || isOver}
			onRequestClose={toggleModal}
		>
			<TouchableWithoutFeedback onPress={onEmptySpacePress}>
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
			</TouchableWithoutFeedback>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalText: {
		textAlign: 'center',
		fontSize: CELL_DIMENSION / 1.5,
		color: TEXT_BRIGHT,
	},
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
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

export default Menu
