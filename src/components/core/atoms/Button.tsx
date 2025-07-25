import React, { ComponentType } from "react"
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { moderateScale } from "src/models/helpers/functionList"
import { colors, spacing, typography } from "src/theme"
import { heightScale } from "src/utils/ratio"
import { IconTypes } from "./Icon"
import { Text, TextProps } from "./Text"

type Presets = keyof typeof $viewPresets

export interface ButtonAccessoryProps {
  style: StyleProp<any>
  pressableState: PressableStateCallbackType
  disabled?: boolean
}

export interface ButtonProps extends PressableProps {
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: TextProps["text"]
  /**
   * The sub text to display if not using `tx` or nested components.
   */
  subText?: TextProps["text"]
  /**
   * The sub text style
   */
  subTextStyle?: TextStyle
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An optional style override for the "pressed" state.
   */
  pressedStyle?: StyleProp<ViewStyle>
  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * An optional style override for the button text when in the "pressed" state.
   */
  pressedTextStyle?: StyleProp<TextStyle>
  /**
   * An optional style override for the button text container.
   */
  buttonLabelContainerStyle?: StyleProp<ViewStyle>
  /**
   * An optional style override for the button text.
   */
  buttonLabelTextStyle?: StyleProp<TextStyle>
  /**
   * An optional style override for the button text when in the "disabled" state.
   */
  disabledTextStyle?: StyleProp<TextStyle>
  /**
   * One of the different types of button presets.
   */
  preset?: Presets
  /**
   * An optional component to render on the right side of the text.
   * Example: `RightAccessory={(props) => <View {...props} />}`
   */
  RightAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * An optional component to render on the left side of the text.
   * Example: `LeftAccessory={(props) => <View {...props} />}`
   */
  LeftAccessory?: ComponentType<ButtonAccessoryProps>
  /**
   * Children components.
   */
  children?: React.ReactNode
  /**
   * disabled prop, accessed directly for declarative styling reasons.
   * https://reactnative.dev/docs/pressable#disabled
   */
  disabled?: boolean
  /**
   * An optional style override for the disabled state
   */
  disabledStyle?: StyleProp<ViewStyle>
  /**
   * Icon that should appear on the right.
   */
  rightIcon?: IconTypes
  /**
   * An optional tint color for the right icon
   */
  rightIconColor?: string

  /**
   * Props to customize the text displayed in the button.
   * These properties can be used to overwrite the default text, if needed.
   */
  textProps?: TextProps
}

/**
 * A component that allows users to take actions and make choices.
 * Wraps the Text component with a Pressable component.
 * @see Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Button/}
 * @param {ButtonProps} props - The props for the `Button` component.
 * @returns {JSX.Element} The rendered `Button` component.
 * @example
 * <Button
 *   tx="common:ok"
 *   style={styles.button}
 *   textStyle={styles.buttonText}
 *   onPress={handleButtonPress}
 * />
 */
export function Button(props: ButtonProps) {
  const {
    text,
    textProps,
    style: $viewStyleOverride,
    pressedStyle: $pressedViewStyleOverride,
    textStyle: $textStyleOverride,
    pressedTextStyle: $pressedTextStyleOverride,
    disabledTextStyle: $disabledTextStyleOverride,
    buttonLabelTextStyle,
    children,
    RightAccessory,
    LeftAccessory,
    disabled,
    disabledStyle: $disabledViewStyleOverride,
    buttonLabelContainerStyle: $buttonLabelContainerStyleOverride,
    ...rest
  } = props

  const preset: Presets = props.preset ?? "default"

  /**
   * @param {PressableStateCallbackType} root0 - The root object containing the pressed state.
   * @param {boolean} root0.pressed - The pressed state.
   * @returns {StyleProp<ViewStyle>} The view style based on the pressed state.
   */
  function $viewStyle({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> {
    return [
      $viewPresets[preset],
      $viewStyleOverride,
      !!pressed && [$pressedViewPresets[preset], $pressedViewStyleOverride],
      !!disabled && [$buttonDisable, $disabledViewStyleOverride],
    ]
  }
  /**
   * @param {PressableStateCallbackType} root0 - The root object containing the pressed state.
   * @param {boolean} root0.pressed - The pressed state.
   * @returns {StyleProp<TextStyle>} The text style based on the pressed state.
   */
  function $textStyle({ pressed }: PressableStateCallbackType): StyleProp<TextStyle> {
    return [
      $textPresets[preset],
      $textStyleOverride,
      !!pressed && [$pressedTextPresets[preset], $pressedTextStyleOverride],
      !!disabled && $disabledTextStyleOverride,
    ]
  }

  return (
    <Pressable
      style={$viewStyle}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      {...rest}
      disabled={disabled}
    >
      {(state) => (
        <>
          {!!LeftAccessory && (
            <LeftAccessory style={$leftAccessoryStyle} pressableState={state} disabled={disabled} />
          )}

          <View style={[$buttonLabelContainer, $buttonLabelContainerStyleOverride]}>
            <Text
              text={text}
              style={[$textStyle(state), buttonLabelTextStyle]}
              size="sm"
              {...textProps}
            >
              {children}
            </Text>
          </View>

          {!!RightAccessory && (
            <RightAccessory
              style={$rightAccessoryStyle}
              pressableState={state}
              disabled={disabled}
            />
          )}
        </>
      )}
    </Pressable>
  )
}

const $baseViewStyle: ViewStyle = {
  minHeight: 56,
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
  paddingVertical: spacing.sm,
  paddingHorizontal: spacing.sm,
  overflow: "hidden",
}

const $baseTextStyle: TextStyle = {
  fontSize: 16,
  lineHeight: 20,
  fontFamily: typography.primary.medium,
  textAlign: "center",
  flexShrink: 1,
  flexGrow: 0,
  zIndex: 2,
}

const $rightAccessoryStyle: ViewStyle = { marginStart: spacing.xs, zIndex: 1 }
const $leftAccessoryStyle: ViewStyle = { marginEnd: spacing.xs, zIndex: 1 }

const $viewPresets = {
  default: [
    $baseViewStyle,
    {
      borderWidth: 1,
      borderColor: colors.palette.grey4,
      backgroundColor: colors.palette.white,
    },
  ] as StyleProp<ViewStyle>,

  filled: [$baseViewStyle, { backgroundColor: colors.palette.blue }] as StyleProp<ViewStyle>,

  reversed: [$baseViewStyle, { backgroundColor: colors.palette.blue }] as StyleProp<ViewStyle>,

  primary: [$baseViewStyle, { backgroundColor: colors.palette.navyBlue }] as StyleProp<ViewStyle>,

  detail: [
    $baseViewStyle,
    {
      borderWidth: 1,
      borderColor: colors.palette.statusRed,
      width: "35%",
    },
  ] as StyleProp<ViewStyle>,

  text: [
    $baseViewStyle,
    {
      backgroundColor: colors.transparent,
      paddingVertical: 0,
      paddingHorizontal: 0,
      minHeight: heightScale(3),
    },
  ] as StyleProp<ViewStyle>,
}

const $textPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: $baseTextStyle,
  filled: $baseTextStyle,
  reversed: [$baseTextStyle, { color: colors.palette.darkBlue }],
  primary: [
    $baseTextStyle,
    {
      color: colors.palette.darkBlue,
      fontFamily: typography.fonts.Poppins.bold,
      textTransform: "uppercase",
    },
  ],
  detail: [
    $baseTextStyle,
    {
      color: colors.palette.grey4,
      textTransform: "uppercase",
      fontFamily: typography.fonts.Poppins.bold,
    },
  ] as StyleProp<TextStyle>,
  text: [
    $baseTextStyle,
    {
      color: colors.palette.darkBlue,
      fontFamily: typography.fonts.Poppins.semiBold,
      textTransform: "capitalize",
      fontSize: moderateScale(14),
    },
  ],
}

const $pressedViewPresets: Record<Presets, StyleProp<ViewStyle>> = {
  default: { backgroundColor: colors.palette.grey4 },
  filled: { backgroundColor: colors.palette.grey4 },
  reversed: { backgroundColor: colors.palette.grey4 },
  primary: { backgroundColor: colors.palette.statusBlue },
  text: { backgroundColor: colors.palette.grey2 },
  detail: { backgroundColor: colors.palette.secondaryGrey },
}

const $pressedTextPresets: Record<Presets, StyleProp<TextStyle>> = {
  default: { opacity: 0.9 },
  filled: { opacity: 0.9 },
  reversed: { opacity: 0.9 },
  primary: { opacity: 0.9 },
  detail: { opacity: 0.9 },
  text: { opacity: 0.9 },
}

const $buttonLabelContainer: ViewStyle = { alignItems: "flex-end" }

const $buttonDisable: ViewStyle = {
  backgroundColor: colors.palette.darkBlue,
}
