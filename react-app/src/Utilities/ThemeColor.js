import { Appearance } from 'react-native'
const colorScheme = Appearance.getColorScheme()

const backgroundColor = colorScheme == 'dark' ? '#1C1B20' : '#FEFEFE'

const componentColor = colorScheme == 'dark' ? '#465155' : '#D0D7DD'

const textColor = colorScheme == 'dark' ? '#FEFEFE' : '#1C1B20'

const bigButtonColor = '#64b5f6'

const ThemeColor = {
  backgroundColor,
  componentColor,
  textColor,
  bigButtonColor,
}

export default ThemeColor
