import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExerciseImage from '../Utilities/ExerciseImage'
import ThemeColor from '../Utilities/ThemeColor'

export default function ExerciseCard({ title, description, image }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, styles.text]}>{title}</Text>
          <Text style={[styles.text, styles.description]}>{description}</Text>
        </View>
        <ExerciseImage
          image={image}
          containerHeight={80}
          containerWidth={80}
          backgroundColor={ThemeColor.spacing}
        />
      </View>
      <View style={styles.line}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: ThemeColor.component,
  },
  container: {
    backgroundColor: ThemeColor.component,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    color: ThemeColor.text,
  },
  textContainer: {
    flex: 1,
    paddingRight: 5,
  },
  title: {
    fontFamily: 'NotoSansMidBold',
    fontSize: 15,
    lineHeight: 20,
    marginTop: 10,
  },
  description: {
    marginTop: 5,
    fontFamily: 'NotoSansMid',
    color: ThemeColor.textGray,
  },
  line: {
    height: 1,
    backgroundColor: ThemeColor.spacing,
    marginHorizontal: 20,
  },
})
