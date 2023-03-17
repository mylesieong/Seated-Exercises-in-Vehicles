import React, { useState } from 'react'
import { STRETCHING_EXERCISE_DATA } from '../../data/StretchingExerciseData'
import Header from './Header'
import ExerciseImage from '../Utilities/ExerciseImage'
import Info from './Info'
import ExerciseNav from './ExerciseNav'
import PageTemplate from '../Utilities/PageTemplate'
import ExerciseDetail from '../ExerciseOverview/ExerciseDetail'
import { Pressable } from 'react-native'

export default function ExerciseSteps() {
  const [step, setStep] = useState(1)
  const [showDetail, setShowDetail] = useState(false)
  const totalStep = STRETCHING_EXERCISE_DATA.length
  const stepDetail = STRETCHING_EXERCISE_DATA[step - 1]

  return (
    <PageTemplate>
      <Header step={step} totalStep={totalStep} setShowDetail={setShowDetail} />
      <Pressable onPress={() => setShowDetail(false)}>
        <ExerciseImage
          image={stepDetail.image}
          imageWidth={'85%'}
          ImageHeight={'85%'}
          containerHeight={400}
        />
      </Pressable>
      <Info
        step={step}
        totalStep={totalStep}
        stepDetail={stepDetail}
        setShowDetail={setShowDetail}
      />
      <ExerciseNav step={step} setStep={setStep} totalStep={totalStep}></ExerciseNav>
      {showDetail && <ExerciseDetail item={stepDetail} setShowDetail={setShowDetail} />}
    </PageTemplate>
  )
}
