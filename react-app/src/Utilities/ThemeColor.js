// import { Appearance } from 'react-native'
// const colorScheme = Appearance.getColorScheme()

// V1.5 now only have light theme, so hard-coded it for now
const colorScheme = 'light'

const backgroundColor = colorScheme == 'dark' ? '#1C1B20' : '#FFFBED'

const componentColor = colorScheme == 'dark' ? '#465155' : '#D0D7DD'

const titleTextColor = colorScheme == 'dark' ? '#4A4A4A' : '#FFFFFF'

const textColor = colorScheme == 'dark' ? '#FEFEFE' : '#4A4A4A'

const statusbar = colorScheme == 'dark' ? 'light-content' : 'dark-content'

const contrastColor = colorScheme == 'dark' ? '#000000' : '#FFFFFF'

const textGrey = '#979797'
const bigButtonColor = '#64b5f6'

const ThemeColor = {
  backgroundColor,
  componentColor,
  titleTextColor,
  textColor,
  textGrey,
  bigButtonColor,
  statusbar,
  contrastColor,
}

export default ThemeColor
