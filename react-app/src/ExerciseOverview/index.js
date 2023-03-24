import { FlatList, Pressable, Platform, Text, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../Utilities/Header'
import Summary from './Summary'
import ExerciseCard from './ExerciseCard'
import { CORE_EXERCISE_DATA } from '../../data/CoreExerciseData'
import { STRETCHING_EXERCISE_DATA } from '../../data/StretchingExerciseData'
import { EXERCISES_INFO } from '../../data/ExercisesInfo'
import PageTemplate from '../Utilities/PageTemplate'
import ExerciseDetail from './ExerciseDetail'
import ThemeColor from '../Utilities/ThemeColor'

export default function ExerciseOverview({ route }) {
  const { id, title } = route.params
  const [showDetail, setShowDetail] = React.useState(false)
  const [selectedStep, setSelectedStep] = useState(1)
  const exercises = { 1: STRETCHING_EXERCISE_DATA, 2: CORE_EXERCISE_DATA }
  const exercise = exercises[id]
  const summary = EXERCISES_INFO[id - 1].summary
  const duration = Math.ceil(
    exercise.reduce((accumulation, currentMove) => accumulation + currentMove.duration, 0) / 60
  )

  const handlePress = (item) => {
    setSelectedStep(item.id)
    setShowDetail(true)
  }

  return (
    <PageTemplate bottomColor={ThemeColor.deepBackground} removeIphoneXFooter={true}>
      <Pressable style={{ zIndex: 2 }} onPress={() => setShowDetail(false)}>
        <Header
          navigation={'Home'}
          backgroundColor={ThemeColor.primaryDarker}
          buttonColor={ThemeColor.textWhite}
          height={190}
        >
          <Text style={styles.title}>{title}</Text>
        </Header>
        <Summary
          moves={exercise.length}
          time={duration}
          format={`Sitting`}
          title={title}
          summary={summary}
        ></Summary>
      </Pressable>
      <View style={styles.moves}>
        <FlatList
          contentContainerStyle={{
            marginTop: Platform.OS === 'android' ? 136 : 160,
            borderRadius: 10,
            overflow: 'hidden',
            paddingBottom: Platform.OS === 'android' ? 135 : 159,
          }}
          data={exercise}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable onPress={() => handlePress(item)}>
              <ExerciseCard title={item.title} description={item.description} image={item.image} />
            </Pressable>
          )}
        />
      </View>
      {showDetail && (
        <ExerciseDetail
          item={exercise[selectedStep - 1]}
          totalSteps={exercise.length}
          setSelectedStep={setSelectedStep}
          setShowDetail={setShowDetail}
        />
      )}
    </PageTemplate>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    lineHeight: 20,
    color: ThemeColor.textWhite,
    marginTop: 13,
    fontFamily: 'NotoSansBold',
    transform: [{ scaleX: 0.875 }],
  },
  moves: {
    flex: 1,
  },
})
