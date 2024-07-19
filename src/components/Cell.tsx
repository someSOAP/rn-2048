import React, { FC } from 'react'
import { View, StyleSheet } from 'react-native'

import { vw } from '@constants/window'
import { CELL_DIMENSION } from '@constants/initail'
import { ICell } from '@/types'

import ValueCell from './ValueCell'

export const Cell: FC<ICell> = (cell) => {
	return (
		<View style={styles.cell}>
			{cell.value ? <ValueCell {...cell} /> : null}
		</View>
	)
}

const styles = StyleSheet.create({
	cell: {
		width: CELL_DIMENSION,
		height: CELL_DIMENSION,
		margin: vw,
	},
})

export default Cell
