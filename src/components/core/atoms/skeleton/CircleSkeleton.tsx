import React from "react"
import ContentLoader, { Circle } from "react-content-loader/native"
import { StyleProp, View, ViewStyle } from "react-native"
import { colors } from "src/theme"

export const CircleSkeleton = (props: {
  speed?: number
  diameter: number
  backgroundColor?: string
  foregroundColor?: string
  style?: StyleProp<ViewStyle>
}) => {
  const { speed = 2, diameter, backgroundColor, foregroundColor, style } = props
  return (
    <View style={style}>
      <ContentLoader
        speed={speed}
        width={diameter}
        height={diameter}
        backgroundColor={backgroundColor ?? colors.palette.grey4}
        foregroundColor={foregroundColor ?? "#DBDBDB"}
      >
        <Circle cx={diameter / 2} cy={diameter / 2} r={diameter / 2} />
      </ContentLoader>
    </View>
  )
}
