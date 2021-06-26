interface GestureRecognizerConfig {
  velocityThreshold?: number
  directionalOffsetThreshold?: number
  gestureIsClickThreshold?: number
}

export const GRID_LENGTH = 4

export const GESTURE_CONFIGS: GestureRecognizerConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 40,
  gestureIsClickThreshold: 10,
}
