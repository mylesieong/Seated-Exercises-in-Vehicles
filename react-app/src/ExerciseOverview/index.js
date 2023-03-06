import { FlatList, StyleSheet, SafeAreaView, View } from 'react-native'
import React from 'react'
import Summary from './Summary'
import ExerciseCard from './ExerciseCard'
import StartExerciseButton from '../Utilities/StartExerciseButton'
import { DUMMY_STRETCHING_EXERCISE_DATA } from '../../data/DummyStretchingExerciseData'

export default function ExerciseOverview() {
  return (
    <View style={styles.upperWrapper}>
      <SafeAreaView />
      <SafeAreaView style={styles.lowerWrapper}>
        <Summary
          moves={DUMMY_STRETCHING_EXERCISE_DATA.length}
          time={`10 mins`}
          format={`Sitting`}
        ></Summary>
        <FlatList
          data={DUMMY_STRETCHING_EXERCISE_DATA}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ExerciseCard
              id={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          )}
          style={styles.flatListContainer}
        />
        <StartExerciseButton />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  upperWrapper: {
    flex: 1,
    backgroundColor: '#ffca28',
    paddingTop: 25,
  },
  lowerWrapper: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
})
