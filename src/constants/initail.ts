import { vw } from '@constants/window'

interface GestureRecognizerConfig {
  velocityThreshold?: number
  directionalOffsetThreshold?: number
  gestureIsClickThreshold?: number
}

export const GRID_LENGTH = 4

export const CELL_DIMENSION = 20 * vw

export const ANIMATION_TIMING = 200 //ms

export const ENABLE_ANIM = true

export const GESTURE_CONFIGS: GestureRecognizerConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
  gestureIsClickThreshold: 5,
}

export const FREDOKA_FONT = 'FREDOKA_FONT'

export const BEST_SCORE_KEY = 'BEST_SCORE'
export const GAME_SATE_KEY = 'GAME_SATE_KEY'
