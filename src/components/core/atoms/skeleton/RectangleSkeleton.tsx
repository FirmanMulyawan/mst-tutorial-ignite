import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"
import { StyleProp, View, ViewStyle } from "react-native"
import { colors } from "src/theme"

export const RectangleSkeleton = (props: {
  speed?: number
  width: number
  height: number
  backgroundColor?: string
  foregroundColor?: string
  style?: StyleProp<ViewStyle>
}) => {
  const { speed = 2, width, height, backgroundColor, foregroundColor, style } = props
  return (
    <View style={[{ width, height }, style, $overflowHidden]}>
      <ContentLoader
        speed={speed}
        width={width}
        height={height}
        backgroundColor={backgroundColor ?? colors.palette.grey4}
        foregroundColor={foregroundColor ?? "#DBDBDB"}
      >
        <Rect x={0} y={0} rx="0" ry="0" width={width} height={height} />
      </ContentLoader>
    </View>
  )
}

const $overflowHidden: ViewStyle = {
  overflow: "hidden",
}
