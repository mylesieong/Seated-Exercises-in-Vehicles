import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemeColor from '../Utilities/ThemeColor'

export default function TextInCard({ description }) {
  return (
    <View style={styles.textContainer}>
      {description?.map((value, index) => (
        <Text key={index} style={styles.text}>
          {' '}
          • {value}
        </Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'NotoSansMid',
    color: ThemeColor.text,
    paddingLeft: 5,
  },
})
