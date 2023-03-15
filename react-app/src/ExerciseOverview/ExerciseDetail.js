import React from 'react'
import { StyleSheet, Text, ScrollView, View, Pressable } from 'react-native'
import { SvgXml } from 'react-native-svg'
import CancelIcon from '../../assets/icons/cancel.svg'

import ExerciseImage from '../Utilities/ExerciseImage'

export default function ExerciseDetail({ item, setShowDetail }) {
  const { title, description, instruction, image } = item
  return (
    <ScrollView style={styles.container}>
      <Pressable style={styles.buttonContainer} onPress={() => setShowDetail(false)}>
        <View style={styles.button}>
          <CancelIcon />
          <Text> Close </Text>
        </View>
      </Pressable>
      <View style={styles.image}>
        <ExerciseImage
          image={image}
          containerHeight={260}
          containerWidth={380}
          containerRadius={10}
        />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.instruction}>{instruction}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    top: 100,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 10,
    padding: 20,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  button: {
    display: 'flex',
    backgroundColor: '#F2F2F2',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  image: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontWeight: 700,
    fontSize: 25,
    marginBottom: 10,
  },
  description: {
    fontWeight: 500,
    fontSize: 16,
    marginBottom: 10,
  },
})
