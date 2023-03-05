import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ClockIcon from '../../assets/icons/clock.svg'

export default function TextInCard({ title, description, available }) {
  return (
    <View style={styles.textContainer}>
      {!available && (
        <Text style={styles.status}>
          <ClockIcon width={16} height={16} /> coming soon
        </Text>
      )}
      <Text style={[styles.textTitle, !available && styles.unavailable]}>{title}</Text>
      {description?.map((value, index) => (
        <Text key={index} style={!available && styles.unavailable}>
          {' '}
          - {value}
        </Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    width: 250
  },
  textTitle: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 6
  },
  status: {
    lineHeight: 16,
    marginBottom: 10
  },
  unavailable: {
    color: '#878d8f'
  }
})
