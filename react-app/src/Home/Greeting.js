import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import ThemeColor from '../Utilities/ThemeColor'

export default function Greeting() {
  const userDate = new Date()
  const hours = userDate.getHours()
  let greet
  if (hours < 12) greet = 'Morning'
  else if (hours >= 12 && hours < 17) greet = 'Afternoon'
  else if (hours >= 17 && hours <= 24) greet = 'Evening'

  return (
    <View>
      <Text style={styles.greetingText}>Good {greet},</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  greetingText: {
    color: ThemeColor.textWhite,
    fontFamily: 'NotoSansExtraBold',
    fontSize: 28,
    lineHeight: 32,
    paddingHorizontal: 10,
    transform: [{ scaleX: 0.9 }],
  },
})
