import Octicons from "@expo/vector-icons/Octicons"
import React, { SetStateAction, useEffect, useState } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import DropDownPicker, { ItemType } from "react-native-dropdown-picker"
import { Text, TextFieldProps } from "src/components/core/atoms"
import { moderateScale } from "src/models/helpers/functionList"
import { colors, spacing, typography } from "src/theme"

export interface DropdownProps extends Pick<TextFieldProps, "status"> {
  /** Indicates if multiple selections are allowed. */
  multiple: boolean

  /** Array of items to display in the dropdown. */
  items: Array<ItemType<string>>

  /** Default selected value(s) in the dropdown. */
  defaultValue?: string | Array<string> | null

  /** Callback function triggered when an item is selected. */
  onSelect: (value: any) => void

  /** Optional style for the dropdown container. */
  style?: StyleProp<ViewStyle>

  /** Optional basic styling for the dropdown. */
  preset?: "basic"

  dropdownStyle?: StyleProp<ViewStyle>
  disabled?: boolean

  /** State for automatic close dropdown when other dropdown is open */
  open?: boolean

  /** Function to change state for automatic close dropdown when other dropdown is open */
  setOpen?: (value: SetStateAction<boolean>) => void

  loading?: boolean
  toggleRemove?: boolean

  /** The container style for dropdown */
  containerStyle?: ViewStyle

  /** The text style for dropdown */
  textStyle?: TextStyle

  /** Arrow down dropdown component */
  ArrowDownIconComponent?: (props: { style: StyleProp<ViewStyle> }) => JSX.Element

  required?: boolean
}

export function Dropdown(props: DropdownProps) {
  const {
    open,
    setOpen,
    loading,
    multiple,
    items,
    defaultValue,
    onSelect,
    style,
    preset,
    dropdownStyle,
    disabled,
    toggleRemove,
    containerStyle,
    textStyle,
    required,
    status,
    ...rest
  } = props
  const [openInternal, setOpenInternal] = useState<boolean>(false)
  const [singleValue, setSingleValue] = useState<string | null>(null)
  const [multiValue, setMultiValue] = useState<Array<string> | null>(null)

  const setOpenHandler = (value: SetStateAction<boolean>) => {
    setOpenInternal(value)
    setOpen?.(value)
  }

  useEffect(() => {
    if (multiple) {
      setMultiValue((defaultValue as Array<string>) || null)
    } else {
      setSingleValue((defaultValue as string) || null)
    }
  }, [defaultValue])

  return (
    <View style={[$container, style, $zIndex(open ?? openInternal)]}>
      <View>
        {multiple ? (
          <DropDownPicker
            listMode="SCROLLVIEW"
            style={[preset === "basic" ? $basicDropdown : $dropDown, dropdownStyle]}
            containerStyle={[$containerSingle(status), containerStyle]}
            dropDownContainerStyle={
              preset === "basic" ? $basicDropdownContainer : $dropDownContainer
            }
            itemSeparator={true}
            itemSeparatorStyle={$itemSeparator}
            labelStyle={$backgroundRed}
            textStyle={[preset === "basic" ? $basicText : $text, textStyle]}
            placeholderStyle={preset === "basic" ? $basicPlaceholderText : $placeholderText}
            open={open ?? openInternal}
            value={multiValue}
            items={items}
            setOpen={setOpenHandler}
            setValue={(value) => {
              setMultiValue(value)
              onSelect(value)
            }}
            setItems={() => {}}
            multiple
            multipleText="You have chosen {count} items."
            showTickIcon={preset !== "basic"}
            loading={loading}
            {...rest}
          />
        ) : (
          <DropDownPicker
            listMode="SCROLLVIEW"
            style={[
              preset === "basic" ? $basicDropdown : $dropDown,
              disabled && { backgroundColor: colors.palette.black },
              dropdownStyle,
            ]}
            containerStyle={[
              disabled && { borderBottomColor: colors.palette.black },
              preset === "basic" ? $basicContainerSingle : $containerSingle(status),
              containerStyle,
            ]}
            dropDownContainerStyle={
              preset === "basic" ? $basicDropdownContainer : $dropDownContainer
            }
            itemSeparator={true}
            itemSeparatorStyle={$itemSeparator}
            textStyle={[
              preset === "basic" ? $basicText : $text,
              disabled && { color: colors.palette.black },
              textStyle,
            ]}
            placeholderStyle={preset === "basic" ? $basicPlaceholderText : $placeholderText}
            open={open ?? openInternal}
            value={singleValue}
            items={items}
            setOpen={setOpenHandler}
            setValue={(value) => {
              setSingleValue(value)
              onSelect(value)
            }}
            setItems={() => {}}
            multiple={false}
            showTickIcon={preset !== "basic"}
            ArrowDownIconComponent={() =>
              singleValue && toggleRemove && !disabled ? (
                <Octicons
                  name="x"
                  size={moderateScale(14)}
                  color="black"
                  onPress={() => {
                    setSingleValue("")
                    onSelect("")
                  }}
                />
              ) : (
                <Octicons
                  name="chevron-down"
                  size={moderateScale(14)}
                  color={disabled ? colors.palette.blue : colors.palette.darkBlue}
                />
              )
            }
            ArrowUpIconComponent={() => (
              <Octicons name="chevron-up" size={moderateScale(14)} color="black" />
            )}
            loading={loading}
            disabled={disabled}
            {...rest}
          />
        )}
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  zIndex: 1,
}

const $title: TextStyle = {
  paddingBottom: spacing.xs,
  fontFamily: typography.primary.medium,
  color: colors.textDim,
}

const $dropDown: ViewStyle = {
  backgroundColor: colors.palette.grey2,
  borderWidth: 0,
  borderRadius: 0,
}

const $basicDropdown: ViewStyle = {
  borderWidth: 0,
  borderRadius: 0,
  paddingHorizontal: 0,
  paddingVertical: 0,
}

const $dropDownContainer: ViewStyle = {
  borderWidth: 0,
  borderRadius: 0,
  backgroundColor: colors.palette.grey4,
}
const $backgroundRed: TextStyle = {
  backgroundColor: "red",
}
const $basicDropdownContainer: ViewStyle = {
  ...$dropDownContainer,
}

const $containerSingle = (status: TextFieldProps["status"]): ViewStyle => ({
  borderBottomWidth: 1,
  borderBottomColor: colors.palette[status === "error" ? "statusRed" : "whiteBlack"],
})

const $basicContainerSingle: ViewStyle = {
  alignItems: "flex-end",
}

const $itemSeparator: ViewStyle = {
  backgroundColor: colors.palette.secondaryGrey,
}

const $text: TextStyle = {
  fontFamily: typography.fonts.Poppins.medium,
  fontSize: 15,
}

const $basicText: TextStyle = {
  ...$text,
  textAlign: "left",
  paddingLeft: spacing.xs,
  marginRight: -spacing.xs,
}

const $placeholderText: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 16,
  color: colors.textDim,
}

const $basicPlaceholderText: TextStyle = {
  fontFamily: typography.fonts.Poppins.semiBold,
  fontSize: 15,
}

const $zIndex = (open: boolean) => ({ zIndex: open ? 100 : 1 })
