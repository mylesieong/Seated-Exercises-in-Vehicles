import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, View } from 'react-native'
import { STRETCHING_EXERCISE_DATA } from '../../data/StretchingExerciseData'
import Header from './Header'
import Image from './Image'
import Info from './Info'
import ExerciseNav from './ExerciseNav'

export default function ExerciseSteps() {
  const [step, setStep] = useState(1)
  const totalStep = STRETCHING_EXERCISE_DATA.length
  const { title, description, instruction, image } = STRETCHING_EXERCISE_DATA[step - 1]

  return (
    <View style={styles.upperWrapper}>
      <SafeAreaView />
      <SafeAreaView style={styles.lowerWrapper}>
        <Header step={step} totalStep={totalStep} />
        <Image image={image} />
        <Info title={title} description={description} instruction={instruction} />
        <ExerciseNav step={step} setStep={setStep}></ExerciseNav>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  upperWrapper: {
    flex: 1,
    backgroundColor: '#ffca28',
    paddingTop: 35,
  },
  lowerWrapper: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
})
