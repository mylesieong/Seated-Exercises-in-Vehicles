import { Appearance } from 'react-native'
const colorScheme = Appearance.getColorScheme()

// Background
const background = colorScheme == 'dark' ? '#1C1B20' : '#FFFBED'
const deepBackground = colorScheme == 'dark' ? '#465155' : '#FFFBED'
const manBackground = colorScheme == 'dark' ? '#465155' : '#D0D7DD'
const component = colorScheme == 'dark' ? '#1C1B20' : '#FFFFFF'
const tab = colorScheme == 'dark' ? '#23292C' : '#FFFFFF'

// Shadow
const shadow = '#9A9A9A'

// Text
const text = colorScheme == 'dark' ? '#FEFEFE' : '#4A4A4A'
const textGray = colorScheme == 'dark' ? '#C2C2C2' : '#979797'
const textWhite = '#FFFFFF'
const textBlack = '#4A4A4A'

// Primary & Secondary
const primaryLighter = '#FFCA28'
const primaryDarker = '#FFB300'
const primaryBlur = '#FFE8AF'
const secondary = '#64b5f6'
const spacing = '#F2F2F2'

// Abandoned in v2.0
const titleTextColor = colorScheme == 'dark' ? '#4A4A4A' : '#FFFFFF'
const contrastColor = colorScheme == 'dark' ? '#000000' : '#FFFFFF'
const statusbar = colorScheme == 'dark' ? 'light-content' : 'dark-content'

const ThemeColor = {
  background,
  deepBackground,
  manBackground,
  component,
  tab,
  shadow,
  text,
  textGray,
  textWhite,
  textBlack,
  primaryLighter,
  primaryDarker,
  primaryBlur,
  secondary,
  spacing,
  titleTextColor,
  contrastColor,
  statusbar,
}

export default ThemeColor
