import { moderateScale } from "src/models/helpers/functionList"

/**
 * Use these spacings for margins/paddings and other whitespace throughout your app.
 *
 * - xxxs : scaled 1
 * - xxs  : scaled 2
 * - xs   : scaled 6
 * - sm   : scaled 10
 * - md   : scaled 14
 * - lg   : scaled 22
 * - xl   : scaled 30
 * - xxl  : scaled 46
 * - xxxl : scaled 62
 */
export const spacing = {
  /** scaled 1 size */
  xxxs: moderateScale(1),
  /** scaled 2 size */
  xxs: moderateScale(2),
  /** scaled 6 size */
  xs: moderateScale(6),
  /** scaled 10 size */
  sm: moderateScale(10),
  /** scaled 14 size */
  md: moderateScale(14),
  /** scaled 22 size */
  lg: moderateScale(22),
  /** scaled 30 size */
  xl: moderateScale(30),
  /** scaled 46 size */
  xxl: moderateScale(46),
  /** scaled 62 size */
  xxxl: moderateScale(62),
} as const
