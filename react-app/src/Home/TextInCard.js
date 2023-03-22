import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ClockIcon from '../../assets/icons/clock.svg'
import ThemeColor from '../Utilities/ThemeColor'

export default function TextInCard({ description, available }) {
  return (
    <View style={styles.textContainer}>
      {!available && (
        <Text style={styles.status}>
          <ClockIcon width={16} height={16} style={styles.icon} /> coming soon
        </Text>
      )}
      {description?.map((value, index) => (
        <Text key={index} style={!available ? styles.unavailable : styles.text} numberOfLines={3}>
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
    color: ThemeColor.textColor,
  },
  status: {
    lineHeight: 16,
    marginBottom: 10,
    color: ThemeColor.textColor,
  },
  unavailable: {
    fontSize: 15,
    color: '#878d8f',
  },
  icon: {
    color: ThemeColor.textColor,
  },
})
