import { FlatList, Pressable } from 'react-native'
import React, { useState } from 'react'
import Header from './Header'
import Summary from './Summary'
import ExerciseCard from './ExerciseCard'
import StartExerciseButton from './StartExerciseButton'
import { STRETCHING_EXERCISE_DATA } from '../../data/StretchingExerciseData'
import PageTemplate from '../Utilities/PageTemplate'
import ExerciseDetail from './ExerciseDetail'

export default function ExerciseOverview() {
  const [showDetail, setShowDetail] = React.useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  const handlePress = (item) => {
    setSelectedItem(item)
    setShowDetail(true)
  }

  return (
    <PageTemplate topBarColor={'#ffca28'}>
      <Pressable onPress={() => setShowDetail(false)}>
        <Header />
        <Summary
          moves={STRETCHING_EXERCISE_DATA.length}
          time={`10 mins`}
          format={`Sitting`}
        ></Summary>
      </Pressable>
      <FlatList
        data={STRETCHING_EXERCISE_DATA}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item)}>
            <ExerciseCard
              id={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          </Pressable>
        )}
      />
      <StartExerciseButton />
      {showDetail && <ExerciseDetail item={selectedItem} setShowDetail={setShowDetail} />}
    </PageTemplate>
  )
}
