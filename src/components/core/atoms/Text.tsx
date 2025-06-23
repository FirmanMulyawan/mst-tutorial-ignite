import React, { ReactNode } from "react"
import {
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
  ColorValue,
} from "react-native"
import { colors, typography } from "src/theme"
import { useAppTheme } from "src/utils/useAppTheme"
import { moderateScale } from "src/models/helpers/functionList"

export type Sizes = keyof typeof $sizeStyles
export type Weights = keyof typeof typography.primary
export type Presets = keyof typeof $presets

export interface TextProps extends RNTextProps {
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * One of the different types of text presets.
   */
  preset?: Presets
  /**
   * Text weight modifier.
   */
  weight?: Weights
  /**
   * Text size modifier.
   */
  size?: Sizes
  /**
   * Text transform modifier.
   */
  transform?: TextStyle["textTransform"]
  /**
   * Text decoration modifier.
   */
  decorationLine?: TextStyle["textDecorationLine"]
  /**
   * Text color.
   */
  color?: ColorValue
  /**
   * Text align.
   */
  align?: TextStyle["textAlign"]
  /**
   * Children components.
   */
  children?: ReactNode
  injectChildren?: ReactNode
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 * @see Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/components/Text/}
 * @param {TextProps} props - The props for the `Text` component.
 * @returns {JSX.Element} The rendered `Text` component.
 */
export function Text(props: TextProps) {
  const {
    color,
    align,
    weight,
    size,
    text,
    children,
    transform,
    decorationLine,
    injectChildren,
    style: $styleOverride,
    ...rest
  } = props
  const { themed } = useAppTheme()

  const content = text ?? children

  const preset: Presets = props.preset ?? "default"
  const $styles: StyleProp<TextStyle> = [
    $rtlStyle,
    themed($presets[preset]),
    weight && $fontWeightStyles[weight],
    size && $sizeStyles[size],
    transform && { textTransform: transform },
    decorationLine && { textDecorationLine: decorationLine },
    $styleOverride,
    color ? ({ color } as TextStyle) : {},
    align ? ({ textAlign: align } as TextStyle) : {},
  ]

  return (
    <RNText {...rest} style={$styles}>
      {content} {injectChildren}
    </RNText>
  )
}

export const $sizeStyles = {
  xxl: { fontSize: moderateScale(36), lineHeight: moderateScale(42) } satisfies TextStyle,
  xl: { fontSize: moderateScale(24), lineHeight: moderateScale(32) } satisfies TextStyle,
  lg: { fontSize: moderateScale(20), lineHeight: moderateScale(30) } satisfies TextStyle,
  md: { fontSize: moderateScale(18), lineHeight: moderateScale(24) } satisfies TextStyle,
  sm: { fontSize: moderateScale(16), lineHeight: moderateScale(22) } satisfies TextStyle,
  xs: { fontSize: moderateScale(14), lineHeight: moderateScale(18) } satisfies TextStyle,
  xxs: { fontSize: moderateScale(12), lineHeight: moderateScale(16) } satisfies TextStyle,
  xxxs: { fontSize: moderateScale(10), lineHeight: moderateScale(14) } satisfies TextStyle,
  xxxxs: { fontSize: moderateScale(8), lineHeight: moderateScale(12) } satisfies TextStyle,
}

const $fontWeightStyles = Object.entries(typography.primary).reduce((acc, [weight, fontFamily]) => {
  return { ...acc, [weight]: { fontFamily } }
}, {}) as Record<Weights, TextStyle>

const $baseStyle: StyleProp<TextStyle> = [
  $sizeStyles.sm,
  $fontWeightStyles.normal,
  { color: colors.text },
]

const $hyperlink: StyleProp<TextStyle> = {
  color: colors.hyperlink,
  fontFamily: typography.primary.semiBold,
}

const $presets = {
  default: $baseStyle,

  bold: [$baseStyle, $fontWeightStyles.bold] as StyleProp<TextStyle>,

  heading: [$baseStyle, $sizeStyles.xxl, $fontWeightStyles.bold] as StyleProp<TextStyle>,

  subheading: [$baseStyle, $sizeStyles.lg, $fontWeightStyles.medium] as StyleProp<TextStyle>,

  formLabel: [$baseStyle, $fontWeightStyles.medium] as StyleProp<TextStyle>,

  formHelper: [$baseStyle, $sizeStyles.sm, $fontWeightStyles.normal] as StyleProp<TextStyle>,

  hyperlink: [$baseStyle, $hyperlink] as StyleProp<TextStyle>,
}

const $rtlStyle: TextStyle = {}
