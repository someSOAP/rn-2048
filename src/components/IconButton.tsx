import React, { FC, useRef, ComponentProps } from 'react'
import { Animated, TouchableWithoutFeedback, ViewStyle } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { TEXT_DARK } from '@constants/colors'
import { ANIMATION_TIMING, CELL_DIMENSION } from '@constants/initail'

interface IIconButtonProps {
	icon: ComponentProps<typeof Ionicons>['name']
	color?: string
	style?: ViewStyle
	onPress(): void
}

export const IconButton: FC<IIconButtonProps> = ({
	color,
	icon,
	onPress,
	style,
}) => {
	const animPress = useRef(new Animated.Value(0)).current

	const buttonAnimatedStyle = {
		transform: [
			{
				scale: animPress.interpolate({
					inputRange: [0, 100],
					outputRange: [1, 0.9],
				}),
			},
		],
	}

	const onPressIn = () => {
		Animated.timing(animPress, {
			toValue: 100,
			useNativeDriver: false,
			duration: ANIMATION_TIMING / 4,
		}).start()
	}

	const onPressOut = () => {
		onPress()
		animPress.stopAnimation(() => animPress.setValue(0))
	}

	return (
		<TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
			<Animated.View style={[style, buttonAnimatedStyle]}>
				<Ionicons
					name={icon}
					color={color ?? TEXT_DARK}
					size={CELL_DIMENSION}
				/>
			</Animated.View>
		</TouchableWithoutFeedback>
	)
}

export default IconButton
