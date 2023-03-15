import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExerciseImage from '../Utilities/ExerciseImage'
import ThemeColor from '../Utilities/ThemeColor'

export default function ExerciseCard({ id, title, description, image }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.id, styles.text]}>{id}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, styles.text]}>{title}</Text>

        <Text style={[styles.description, styles.text]}>{description}</Text>
      </View>
      <ExerciseImage image={image} containerHeight={64} containerWidth={64} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeColor.backgroundColor,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    margin: 15,
  },
  text: {
    color: ThemeColor.textColor,
  },
  id: {
    fontStyle: 'italic',
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 500,
    height: 30,
  },
})
