import { Dimensions } from "react-native"
import DeviceInfo from "react-native-device-info"

export const moderateScale = (size: number): number => {
  const { width } = Dimensions.get("window")
  const guidelineBaseWidth = 320
  const isTab = DeviceInfo.isTablet()
  const factor = isTab ? 0.35 : 0.75

  const scale = (size: number) => (width / guidelineBaseWidth) * size

  return size + (scale(size) - size) * factor
}

export const RpFormat = (value: number, option?: Intl.NumberFormatOptions): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    ...option,
  }).format(value)
}

export const getPriceValue = (value: number) => {
  return value ? RpFormat(value, { maximumFractionDigits: 0 }).replace("Rp", "Rp ") : ""
}

export const isEmptyObject = (obj: any) => {
  return Object.keys(obj).length === 0
}

export const normalizePhone = (phone: string) =>
  phone.replace(/\s+/g, "").replace(/^(\+62|0)/, "62")
