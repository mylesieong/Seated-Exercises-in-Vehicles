import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ClockIcon from '../../assets/icons/clock.svg'
import ThemeColor from '../Utilities/ThemeColor'

export default function TextInCard({ title, description, available }) {
  return (
    <View style={styles.textContainer}>
      {!available && (
        <Text style={styles.status}>
          <ClockIcon width={16} height={16} style={styles.icon} /> coming soon
        </Text>
      )}
      <Text style={[styles.textTitle, !available && styles.unavailable]}>{title}</Text>
      {description?.map((value, index) => (
        <Text key={index} style={!available ? styles.unavailable : styles.text}>
          {' '}
          - {value}
        </Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
  },
  textTitle: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 6,
    color: ThemeColor.textColor,
  },
  text: {
    color: ThemeColor.textColor,
  },
  status: {
    lineHeight: 16,
    marginBottom: 10,
    color: ThemeColor.textColor,
  },
  unavailable: {
    color: '#878d8f',
  },
  icon: {
    color: ThemeColor.textColor,
  },
})
