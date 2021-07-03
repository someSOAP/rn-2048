import { vw } from '@constants/window'

interface GestureRecognizerConfig {
  velocityThreshold?: number
  directionalOffsetThreshold?: number
  gestureIsClickThreshold?: number
}

export const GRID_LENGTH = 4

export const CELL_DIMENSION = 20 * vw

export const ANIMATION_TIMING = 1000 //ms

export const GESTURE_CONFIGS: GestureRecognizerConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 40,
  gestureIsClickThreshold: 10,
}
