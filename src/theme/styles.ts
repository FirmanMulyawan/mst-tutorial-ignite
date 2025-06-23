import { ColorValue, TextStyle, ViewStyle } from "react-native"
import { moderateScale } from "../models/helpers/functionList"
import { heightScale, screenHeight } from "../utils/ratio"
import { colors } from "./colors"
import { spacing } from "./spacing"
import { typography } from "./typography"

/* Use this file to define styles that are used in multiple places in your app. */
export const $styles = {
  borderWidth: (width: number) => ({ borderWidth: width }) as ViewStyle,
  row: { flexDirection: "row" } as ViewStyle,
  rowCenter: { flexDirection: "row", alignItems: "center" } as ViewStyle,
  flex1: { flex: 1 } as ViewStyle,
  flexGrow0: { flexGrow: 0 } as ViewStyle,
  flexWrap: { flexWrap: "wrap" } as ViewStyle,
  upperCase: { textTransform: "uppercase", paddingVertical: spacing.xxs } as TextStyle,
  lineThrough: { textDecorationLine: "line-through" } as TextStyle,
  textAlign: (align: "auto" | "left" | "right" | "center" | "justify") =>
    ({ textAlign: align }) as TextStyle,
  container: {
    paddingTop: spacing.lg + spacing.xl,
    paddingHorizontal: spacing.lg,
  } as ViewStyle,
  minScaleHeight: { height: heightScale(50) } as ViewStyle,
  toggleInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  } as ViewStyle,
  displayNone: { display: "none" } as ViewStyle,
  gap: (gap: number) => ({ gap }) as ViewStyle,
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: screenHeight * 0.8,
    opacity: 0.5,
  } as ViewStyle,
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  } as ViewStyle,
  radius: (borderRadius: number) => ({ borderRadius }) as ViewStyle,
  // button style
  buttonText: {
    fontSize: moderateScale(12),
    color: colors.text,
    fontFamily: typography.primary.bold,
  } as TextStyle,
  buttonStyle: (isEnabled: boolean, activeColor?: ColorValue): ViewStyle => ({
    minHeight: 0,
    marginBottom: 0,
    paddingHorizontal: spacing.xl,
    backgroundColor: isEnabled ? (activeColor ?? colors.palette.darkBlue) : colors.palette.darkBlue,
    borderColor: isEnabled ? (activeColor ?? colors.palette.grey2) : colors.palette.grey4,
  }),
}
