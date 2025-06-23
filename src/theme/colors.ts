const palette = {
  black: "#000000",
  white: "#FFFFFF",
  whiteBlack: "#002D40",
  primaryBlack: "#052A49",
  secondaryGrey: "#4F4F4F",
  grey2: "#828282",
  grey4: "#E0E0E0",
  navyBlue: "#052A49",
  darkBlue: "#073B4C",
  blue: "#1BA8DF",
  statusBlue: "#2D9CDB",
  statusRed: "#EB5757",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(255, 255, 255, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.darkBlue,
  /**
   * Secondary text information.
   */
  textDim: palette.secondaryGrey,
  /**
   * The default color of the screen background.
   */
  background: palette.navyBlue,
  /**
   * The default border color.
   */
  border: palette.grey4,

  hyperlink: "#036EBC",
}
