import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { colors, typography } from "src/theme"
import { Text } from "./Text"
import ReactNativeModal, { ModalProps as RNModalProps } from "react-native-modal"
import { moderateScale } from "src/models/helpers/functionList"

export interface ModalProps extends Partial<RNModalProps> {
  title?: string
  content?: string
  containerStyle?: StyleProp<ViewStyle>
  onBackdropPress?: () => void
  onCloseModal?: () => void
  titleStyle?: StyleProp<TextStyle>
  contentStyle?: StyleProp<TextStyle>
}

export const Modal: React.FC<ModalProps> = (props) => {
  const { onCloseModal, onBackdropPress, title, content, containerStyle, ...rest } = props
  const { titleStyle, contentStyle } = props

  const onCloseSheet = () => {
    if (onCloseModal) {
      onCloseModal()
    }
  }

  const onCloseSheetBackDrop = () => {
    if (onBackdropPress) {
      onBackdropPress()
    } else onCloseSheet()
  }

  return (
    <ReactNativeModal
      useNativeDriver
      {...rest}
      style={styling.container}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onBackButtonPress={onCloseSheet}
      onBackdropPress={onCloseSheetBackDrop}
    >
      <View style={[styling.modalWrapper, containerStyle]}>
        {title && <Text style={[styling.titleText, titleStyle]} text={title} />}
        {content && <Text style={[styling.contentText, contentStyle]} text={content} />}
        {props.children}
      </View>
    </ReactNativeModal>
  )
}

const styling = {
  container: {
    marginHorizontal: 0,
    marginVertical: 0,
  } as ViewStyle,
  modalWrapper: {
    backgroundAttachment: colors.background,
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateScale(12),
    marginHorizontal: moderateScale(12),
  } as ViewStyle,
  titleText: {
    fontSize: 16,
    lineHeight: 22,
    fontFamily: typography.primary.semiBold,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 5,
  } as TextStyle,
  contentText: {
    lineHeight: 22,
    textAlign: "center",
    fontSize: 14,
    marginBottom: 20,
  } as TextStyle,
}
