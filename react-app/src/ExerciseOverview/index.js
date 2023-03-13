import { FlatList } from 'react-native'
import React from 'react'
import Header from './Header'
import Summary from './Summary'
import ExerciseCard from './ExerciseCard'
import StartExerciseButton from './StartExerciseButton'
import { STRETCHING_EXERCISE_DATA } from '../../data/StretchingExerciseData'
import PageTemplate from '../Utilities/PageTemplate'

export default function ExerciseOverview() {
  return (
    <PageTemplate topBarColor={'#ffca28'}>
      <Header />
      <Summary
        moves={STRETCHING_EXERCISE_DATA.length}
        time={`10 mins`}
        format={`Sitting`}
      ></Summary>
      <FlatList
        data={STRETCHING_EXERCISE_DATA}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExerciseCard
            id={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
          />
        )}
      />
      <StartExerciseButton />
    </PageTemplate>
  )
}
