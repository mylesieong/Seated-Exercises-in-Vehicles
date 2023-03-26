import React, { useState } from 'react'
import { STRETCHING_EXERCISE_DATA } from '../../data/StretchingExerciseData'
import { CORE_EXERCISE_DATA } from '../../data/CoreExerciseData'
import Header from './Header'
import ExerciseImage from '../Utilities/ExerciseImage'
import Info from './Info'
import ExerciseNav from './ExerciseNav'
import PageTemplate from '../Utilities/PageTemplate'
import ExerciseDetail from '../ExerciseOverview/ExerciseDetail'
import { StyleSheet, Text } from 'react-native'
import ThemeColor from '../Utilities/ThemeColor'

export default function ExerciseSteps({ route }) {
  const { id, title } = route.params
  const [step, setStep] = useState(1)
  const [showDetail, setShowDetail] = useState(false)
  const exercises = { 1: STRETCHING_EXERCISE_DATA, 2: CORE_EXERCISE_DATA }
  const exercise = exercises[id]
  const totalStep = exercise.length
  const stepDetail = exercise[step - 1]

  return (
    <PageTemplate topBarColor={ThemeColor.manBackground} bottomColor={ThemeColor.background}>
      <Header step={step} totalStep={totalStep} setShowDetail={setShowDetail} title={title} />
      <ExerciseImage
        image={stepDetail.image}
        imageWidth={'85%'}
        ImageHeight={'85%'}
        containerHeight={380}
        backgroundColor={ThemeColor.manBackground}
        step={step}
        totalStep={totalStep}
      />
      <Text style={styles.step}>
        {step} / {totalStep}
      </Text>
      <Info stepDetail={stepDetail} setShowDetail={setShowDetail} />
      <ExerciseNav
        id={id}
        title={title}
        step={step}
        setStep={setStep}
        totalStep={totalStep}
      ></ExerciseNav>
      {showDetail && <ExerciseDetail item={stepDetail} setShowDetail={setShowDetail} />}
    </PageTemplate>
  )
}

const styles = StyleSheet.create({
  step: {
    fontSize: 15,
    lineHeight: 20,
    color: ThemeColor.text,
    padding: 15,
    backgroundColor: ThemeColor.manBackground,
    fontFamily: 'NotoSansMidBold',
  },
})
