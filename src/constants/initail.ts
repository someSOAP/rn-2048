import { vh, vw } from './window'

interface GestureRecognizerConfig {
  velocityThreshold?: number
  directionalOffsetThreshold?: number
  gestureIsClickThreshold?: number
}

export const GRID_LENGTH = 4

export const GESTURE_CONFIGS: GestureRecognizerConfig = {
  velocityThreshold: 0.2,
  directionalOffsetThreshold: 100 * vh,
  gestureIsClickThreshold: 2 * vw,
}
