import { Feather } from "@expo/vector-icons"
import AntDesign from "@expo/vector-icons/AntDesign"
import React, { ComponentType, forwardRef, Ref, useImperativeHandle, useRef } from "react"
import {
  Pressable,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native"
import { moderateScale } from "src/models/helpers/functionList"
import { colors, spacing, typography } from "src/theme"
import { Text, TextProps } from "./Text"

export interface TextFieldAccessoryProps {
  style: StyleProp<any>
  status: TextFieldProps["status"]
  multiline: boolean
  editable: boolean
}

export interface TextFieldProps extends Omit<TextInputProps, "ref"> {
  /**
   * A style modifier for different input states.
   */
  status?: "error" | "disabled" | "success"
  /**
   * The label text to display if not using `labelTx`.
   */
  label?: TextProps["text"]
  /**
   * Pass any additional props directly to the label Text component.
   */
  LabelTextProps?: TextProps
  /**
   * The helper text to display if not using `helperTx`.
   */
  helper?: TextProps["text"]
  injectHelper?: React.ReactNode
  /**
   * Helper text which is looked up via i18n.
   */
  helperStyle?: StyleProp<TextStyle>
  /**
   * Pass any additional props directly to the helper Text component.
   */
  HelperTextProps?: TextProps
  /**
   * The placeholder text to display if not using `placeholderTx`.
   */
  placeholder?: TextProps["text"]
  /**
   * Optional input style override.
   */
  style?: StyleProp<TextStyle>
  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Style overrides for the input wrapper
   */
  inputWrapperStyle?: StyleProp<ViewStyle>
  /**
   * Puts a red asterisk next to the label if true
   */
  required?: boolean
  /**
   * An optional component to render on the right side of the input.
   * Example: `RightAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  RightAccessory?: ComponentType<TextFieldAccessoryProps>
  /**
   * An optional component to render on the left side of the input.
   * Example: `LeftAccessory={(props) => <Icon icon="ladybug" containerStyle={props.style} color={props.editable ? colors.textDim : colors.text} />}`
   * Note: It is a good idea to memoize this.
   */
  LeftAccessory?: ComponentType<TextFieldAccessoryProps>
  /**
   * If true, add red asterix into the label.
   */
  alert?: boolean
  onPressAlert?: () => void
}

/**
 * A component that allows for the entering and editing of text.
 * @see Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/TextField/}
 * @param {TextFieldProps} props - The props for the `TextField` component.
 * @returns {JSX.Element} The rendered `TextField` component.
 */
export const TextField = forwardRef(function TextField(props: TextFieldProps, ref: Ref<TextInput>) {
  const {
    label,
    placeholder,
    helper,
    injectHelper,
    helperStyle,
    status,
    LeftAccessory,
    HelperTextProps,
    LabelTextProps,
    style: $inputStyleOverride,
    containerStyle: $containerStyleOverride,
    inputWrapperStyle: $inputWrapperStyleOverride,
    required,
    alert,
    onPressAlert,
    ...TextInputProps
  } = props

  const ErrorIcon: React.ComponentType<TextFieldAccessoryProps> = React.useMemo(
    () =>
      function ErrorIcon() {
        return (
          <AntDesign
            name="exclamationcircleo"
            size={24}
            color={colors.palette.statusRed}
            style={{ paddingVertical: spacing.sm, paddingRight: spacing.md }}
          />
        )
      },
    [],
  )
  const SuccessIcon: React.ComponentType<TextFieldAccessoryProps> = React.useMemo(
    () =>
      function SuccessIcon() {
        return (
          <AntDesign
            name="checkcircle"
            size={24}
            color={"#00BA00"}
            style={{ paddingVertical: spacing.sm, paddingRight: spacing.md }}
          />
        )
      },
    [],
  )
  const RightAccessory =
    !props.RightAccessory && status === "error"
      ? ErrorIcon
      : !props.RightAccessory && status === "success"
        ? SuccessIcon
        : props.RightAccessory

  const input = useRef<TextInput>(null)

  const disabled = TextInputProps.editable === false || status === "disabled"

  const placeholderContent = placeholder

  const $containerStyles = [$containerStyle, $containerStyleOverride]

  const $labelStyles = [$labelStyle, LabelTextProps?.style]

  const $inputWrapperStyles = [
    $inputWrapperStyle,
    status === "error" && { borderColor: colors.palette.statusRed },
    status === "success" && { borderColor: "#00BA00" },
    TextInputProps.multiline && { minHeight: 112 },
    LeftAccessory && { paddingStart: 0 },
    RightAccessory && { paddingEnd: 0 },
    $inputWrapperStyleOverride,
  ]

  const $inputStyles: StyleProp<TextStyle> = [
    $inputStyle,
    disabled && { color: colors.textDim },
    TextInputProps.multiline && { height: "auto" },
    $inputStyleOverride,
  ]

  const $helperStyles = [
    $helperStyle,
    status === "error" && { color: colors.palette.statusRed },
    HelperTextProps?.style,
  ]

  /**
   *
   */
  function focusInput() {
    if (disabled) return

    input.current?.focus()
  }

  useImperativeHandle(ref, () => input.current as TextInput)

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={$containerStyles}
      onPress={focusInput}
      accessibilityState={{ disabled }}
    >
      {!!label && (
        <Text preset="formLabel" {...LabelTextProps} style={$labelStyles} size="xxs">
          {label}
          {required && (
            <Text
              preset="formLabel"
              text={" *"}
              style={[$labelStyles, { color: colors.palette.statusRed }]}
              size="xxs"
            />
          )}
          {alert && (
            <>
              <Text text="  " />
              <TouchableOpacity onPress={onPressAlert}>
                <Feather name="info" size={moderateScale(12)} color={colors.palette.darkBlue} />
              </TouchableOpacity>
            </>
          )}
        </Text>
      )}

      <Pressable
        style={$inputWrapperStyles}
        onPress={TextInputProps.onPress && TextInputProps.onPress}
      >
        {!!LeftAccessory && (
          <LeftAccessory
            style={$leftAccessoryStyle}
            status={status}
            editable={!disabled}
            multiline={TextInputProps.multiline ?? false}
          />
        )}

        <TextInput
          ref={input}
          underlineColorAndroid={colors.transparent}
          textAlignVertical="top"
          placeholder={placeholderContent}
          placeholderTextColor={colors.textDim}
          // maxLength={8} //Setting this interferes with paste, causing paste to only paste 8 characters
          {...TextInputProps}
          editable={!disabled}
          style={$inputStyles}
        />

        {!!RightAccessory && (
          <RightAccessory
            style={$rightAccessoryStyle}
            status={status}
            editable={!disabled}
            multiline={TextInputProps.multiline ?? false}
          />
        )}
      </Pressable>

      {!!helper && (
        <React.Fragment>
          <Text
            preset="formHelper"
            text={helper}
            injectChildren={injectHelper}
            {...HelperTextProps}
            style={[$helperStyles, helperStyle]}
            size="xxs"
          />
        </React.Fragment>
      )}
    </TouchableOpacity>
  )
})

const $containerStyle: ViewStyle = {
  justifyContent: "center",
}

const $labelStyle: TextStyle = {
  marginBottom: spacing.xs,
  color: colors.textDim,
}

const $inputWrapperStyle: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-start",
  borderBottomWidth: 1,
  backgroundColor: colors.palette.darkBlue,
  borderColor: colors.palette.grey4,
  overflow: "hidden",
}

const $inputStyle: TextStyle = {
  flex: 1,
  alignSelf: "stretch",
  fontFamily: typography.primary.normal,
  color: colors.text,
  fontSize: moderateScale(16),
  height: 24,
  // https://github.com/facebook/react-native/issues/21720#issuecomment-532642093
  paddingVertical: 0,
  paddingHorizontal: 0,
  marginVertical: spacing.sm,
  marginHorizontal: spacing.md,
}

const $helperStyle: TextStyle = {
  marginTop: spacing.xxs,
}

const $rightAccessoryStyle: ViewStyle = {
  marginEnd: spacing.xs,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
}
const $leftAccessoryStyle: ViewStyle = {
  marginStart: spacing.xs,
  height: 40,
  justifyContent: "center",
  alignItems: "center",
}
