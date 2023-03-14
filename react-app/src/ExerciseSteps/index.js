import React, { useState } from 'react'
import { STRETCHING_EXERCISE_DATA } from '../../data/StretchingExerciseData'
import Header from './Header'
import ExerciseImage from '../Utilities/ExerciseImage'
import Info from './Info'
import ExerciseNav from './ExerciseNav'
import PageTemplate from '../Utilities/PageTemplate'

export default function ExerciseSteps() {
  const [step, setStep] = useState(1)
  const totalStep = STRETCHING_EXERCISE_DATA.length
  const { title, description, instruction, image } = STRETCHING_EXERCISE_DATA[step - 1]

  return (
    <PageTemplate topBarColor={'#ffca28'}>
      <Header step={step} totalStep={totalStep} />
      <ExerciseImage image={image} imageWidth={'85%'} ImageHeight={'85%'} containerHeight={270} />
      <Info title={title} description={description} instruction={instruction} />
      <ExerciseNav step={step} setStep={setStep} totalStep={totalStep}></ExerciseNav>
    </PageTemplate>
  )
}
