import React from "react"
import { Image, ImageProps, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { spacing } from "src/theme"
import { Button, ButtonProps } from "./Button"
import { Text, TextProps } from "./Text"

const sadFace = require("assets/images/sad-face.png")

interface EmptyStateProps {
  /**
   * An optional prop that specifies the text/image set to use for the empty state.
   */
  preset?: keyof typeof EmptyStatePresets
  /**
   * Style override for the container.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An Image source to be displayed above the heading.
   */
  imageSource?: ImageProps["source"]
  /**
   * Style overrides for image.
   */
  imageStyle?: StyleProp<ImageStyle>
  /**
   * Pass any additional props directly to the Image component.
   */
  ImageProps?: Omit<ImageProps, "source">
  /**
   * The heading text to display if not using `headingTx`.
   */
  heading?: TextProps["text"]
  /**
   * Style overrides for heading text.
   */
  headingStyle?: StyleProp<TextStyle>
  /**
   * Pass any additional props directly to the heading Text component.
   */
  HeadingTextProps?: TextProps
  /**
   * The content text to display if not using `contentTx`.
   */
  content?: TextProps["text"]
  /**
   * Style overrides for content text.
   */
  contentStyle?: StyleProp<TextStyle>
  /**
   * Pass any additional props directly to the content Text component.
   */
  ContentTextProps?: TextProps
  /**
   * The button text to display if not using `buttonTx`.
   */
  button?: TextProps["text"]
  /**
   * Style overrides for button.
   */
  buttonStyle?: ButtonProps["style"]
  /**
   * Style overrides for button text.
   */
  buttonTextStyle?: ButtonProps["textStyle"]
  /**
   * Called when the button is pressed.
   */
  buttonOnPress?: ButtonProps["onPress"]
  /**
   * Pass any additional props directly to the Button component.
   */
  ButtonProps?: ButtonProps
}

interface EmptyStatePresetItem {
  imageSource: ImageProps["source"]
  heading: TextProps["text"]
  content: TextProps["text"]
  button: TextProps["text"]
}

const EmptyStatePresets = {
  generic: {
    imageSource: sadFace,
    heading: "Nothing to see here",
    content: "Please check back later or try a different search.",
    button: "Go to Home",
  } as EmptyStatePresetItem,
} as const

/**
 * A component to use when there is no data to display. It can be utilized to direct the user what to do next.
 * @see Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/EmptyState/}
 * @param {EmptyStateProps} props - The props for the `EmptyState` component.
 * @returns {JSX.Element} The rendered `EmptyState` component.
 */
export function EmptyState(props: EmptyStateProps) {
  const preset = EmptyStatePresets[props.preset ?? "generic"]

  const {
    button,
    buttonOnPress,
    content = preset.content,
    heading = preset.heading,
    imageSource = preset.imageSource,
    style: $containerStyleOverride,
    buttonStyle: $buttonStyleOverride,
    buttonTextStyle: $buttonTextStyleOverride,
    contentStyle: $contentStyleOverride,
    headingStyle: $headingStyleOverride,
    imageStyle: $imageStyleOverride,
    ButtonProps,
    ContentTextProps,
    HeadingTextProps,
    ImageProps,
  } = props

  const isImagePresent = !!imageSource
  const isHeadingPresent = !!heading
  const isContentPresent = !!content
  const isButtonPresent = !!button

  const $containerStyles = [$containerStyleOverride]
  const $imageStyles = [
    $image,
    (isHeadingPresent || isContentPresent || isButtonPresent) && { marginBottom: spacing.xxxs },
    $imageStyleOverride,
    ImageProps?.style,
  ]
  const $headingStyles = [
    $heading,
    isImagePresent && { marginTop: spacing.xxxs },
    (isContentPresent || isButtonPresent) && { marginBottom: spacing.xxxs },
    $headingStyleOverride,
    HeadingTextProps?.style,
  ]
  const $contentStyles = [
    $content,
    (isImagePresent || isHeadingPresent) && { marginTop: spacing.xxxs },
    isButtonPresent && { marginBottom: spacing.xxxs },
    $contentStyleOverride,
    ContentTextProps?.style,
  ]
  const $buttonStyles = [
    (isImagePresent || isHeadingPresent || isContentPresent) && { marginTop: spacing.xl },
    $buttonStyleOverride,
    ButtonProps?.style,
  ]

  return (
    <View style={$containerStyles}>
      {isImagePresent && <Image source={imageSource} {...ImageProps} style={$imageStyles} />}

      {isHeadingPresent && (
        <Text
          preset="subheading"
          text={heading}
          size="md"
          {...HeadingTextProps}
          style={$headingStyles}
        />
      )}

      {isContentPresent && (
        <Text text={content} size="xs" {...ContentTextProps} style={$contentStyles} />
      )}

      {isButtonPresent && (
        <Button
          onPress={buttonOnPress}
          text={button}
          textStyle={$buttonTextStyleOverride}
          {...ButtonProps}
          style={$buttonStyles}
        />
      )}
    </View>
  )
}

const $image: ImageStyle = { alignSelf: "center" }
const $heading: TextStyle = { textAlign: "center", paddingHorizontal: spacing.lg }
const $content: TextStyle = { textAlign: "center", paddingHorizontal: spacing.lg }
