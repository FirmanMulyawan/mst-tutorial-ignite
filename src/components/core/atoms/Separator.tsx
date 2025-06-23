import React from "react"
import { StyleProp, View, ViewStyle } from "react-native"
import { colors } from "src/theme"

const Separator = ({
  type = "solid",
  color = colors.palette.grey2,
  style,
}: {
  type?: "dashed" | "solid"
  color?: string
  style?: StyleProp<ViewStyle>
}) => {
  return (
    <View
      style={[
        $separatorHeight,
        {
          borderColor: color,
          borderStyle: type,
        },
        style,
      ]}
    />
  )
}
export default Separator

const $separatorHeight: ViewStyle = { borderWidth: 0.75 }
