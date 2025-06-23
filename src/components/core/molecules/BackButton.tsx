import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import { Href, router } from "expo-router"
import React from "react"
import { Pressable, View, ViewStyle } from "react-native"
import { moderateScale } from "src/models/helpers/functionList"
import { colors, spacing } from "src/theme"

export interface BackButtonProps {
  customBack?: Href
  style?: ViewStyle
  onBackPress?: () => void
  bottomRightActions?: ("search" | "location" | "cart" | "notification" | "profile")[]
}

export const BackButton: React.FC<BackButtonProps> = (_props: BackButtonProps) => {
  const { customBack, style, onBackPress } = _props
  return (
    <Pressable
      style={style}
      onPress={
        onBackPress
          ? () => onBackPress()
          : () => (customBack ? router.navigate(customBack) : router.back())
      }
    >
      <View style={$backButton}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={moderateScale(16)}
          color={colors.background}
        />
      </View>
    </Pressable>
  )
}

const $backButton: ViewStyle = {
  backgroundColor: colors.palette.black,
  padding: spacing.xxs,
  borderRadius: 100,
}
