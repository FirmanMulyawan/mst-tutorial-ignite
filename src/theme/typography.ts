import {
  Poppins_300Light as PoppinsLight,
  Poppins_400Regular as PoppinsRegular,
  Poppins_400Regular_Italic as PoppinsRegularItalic,
  Poppins_500Medium as PoppinsMedium,
  Poppins_600SemiBold as PoppinsSemiBold,
  Poppins_600SemiBold_Italic as PoppinsSemiBoldItalic,
  Poppins_700Bold as PoppinsBold,
  Poppins_800ExtraBold_Italic as PoppinsExtraBoldItalic,
} from "@expo-google-fonts/poppins"

export const customFontsToLoad = {
  PoppinsLight,
  PoppinsRegular,
  PoppinsRegularItalic,
  PoppinsMedium,
  PoppinsSemiBold,
  PoppinsSemiBoldItalic,
  PoppinsBold,
  PoppinsExtraBoldItalic,
}

const fonts = {
  Poppins: {
    // Cross-platform Google font.
    light: "PoppinsLight",
    normal: "PoppinsRegular",
    regularItalic: "PoppinsRegularItalic",
    medium: "PoppinsMedium",
    semiBold: "PoppinsSemiBold",
    semiBoldItalic: "PoppinsSemiBoldItalic",
    bold: "PoppinsBold",
    extraBoldItalic: "PoppinsExtraBoldItalic",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.Poppins,
}
