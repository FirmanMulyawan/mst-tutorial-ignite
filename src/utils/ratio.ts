import { Dimensions, PixelRatio, Platform, ScaledSize } from "react-native"

const screenSize: ScaledSize = Dimensions.get("window")
const screenWidth = Dimensions.get("window").width
const screenHeight = Dimensions.get("window").height

const pixelRatio = PixelRatio.get()
const devicePlatform = Platform.OS === "ios" ? "ios" : "android"

const widthScale = (value: number) => PixelRatio.roundToNearestPixel((screenWidth * value) / 100)
const heightScale = (value: number) => PixelRatio.roundToNearestPixel((screenHeight * value) / 100)
const multiplier = pixelRatio >= 3 ? screenHeight * 0.9 : screenHeight
const multiplierWidth =
  pixelRatio >= 3 ? screenWidth * 0.9 : pixelRatio >= 4 ? screenWidth * 0.75 : screenWidth
const heightScaleHighRatio = (value: number) =>
  PixelRatio.roundToNearestPixel((multiplier * value) / 100)
const widthScaleHighRatio = (value: number) =>
  PixelRatio.roundToNearestPixel((multiplierWidth * value) / 100)

/**
 * Ukuran container height
 * berdasarkan dimensi layar,
 * nilai 48 adalah appBar dan statusbar
 */

const platformScale = (value1: any, value2: any) => {
  if (Platform.OS === "ios") {
    return value1
  } else {
    return value2
  }
}

const responsive = (size1 = 0, size2 = 0) => {
  if (screenWidth <= 350) {
    return size1
  } else if (screenWidth <= 400) {
    return size2 * 0.8
  } else {
    return size2
  }
}

const normalize = (size: number) => {
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(size))
  } else {
    if (pixelRatio >= 3) {
      return Math.round(PixelRatio.roundToNearestPixel(size) - 1)
    } else {
      return size
    }
  }
}

/**
 * Create theme spacing
 * @param {number} unit
 * @returns {number}
 */
const createSpacing = (spacing: number): number => {
  const unit = 4
  if (!spacing) {
    return 0
  }

  return spacing * unit
}

export {
  devicePlatform,
  widthScale,
  heightScale,
  heightScaleHighRatio,
  widthScaleHighRatio,
  platformScale,
  screenWidth,
  screenHeight,
  responsive,
  createSpacing,
  screenSize,
  normalize,
}

// =========PixelRatio=========
// iPhone 7 = 2
// iPhone 7 Plus, X = 3
// Samsung S7 = 2.625
