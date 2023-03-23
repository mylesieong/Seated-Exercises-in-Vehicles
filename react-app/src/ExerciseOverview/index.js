import { FlatList, Pressable, Platform, Text, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../Utilities/Header'
import Summary from './Summary'
import ExerciseCard from './ExerciseCard'
import { CORE_EXERCISE_DATA } from '../../data/CoreExerciseData'
import { STRETCHING_EXERCISE_DATA } from '../../data/StretchingExerciseData'
import PageTemplate from '../Utilities/PageTemplate'
import ExerciseDetail from './ExerciseDetail'
import ThemeColor from '../Utilities/ThemeColor'

export default function ExerciseOverview({ route }) {
  const { id, title } = route.params
  const [showDetail, setShowDetail] = React.useState(false)
  const [selectedStep, setSelectedStep] = useState(1)
  const exercises = { 1: STRETCHING_EXERCISE_DATA, 2: CORE_EXERCISE_DATA }
  const exercise = exercises[id]
  const duration = Math.ceil(
    exercise.reduce((accumulation, currentMove) => accumulation + currentMove.duration, 0) / 60
  )

  const handlePress = (item) => {
    setSelectedStep(item.id)
    setShowDetail(true)
  }

  return (
    <PageTemplate topBarColor={'#FFB300'}>
      <Pressable style={{ zIndex: 2 }} onPress={() => setShowDetail(false)}>
        <Header
          navigation={'Home'}
          backgroundColor={'#FFB300'}
          buttonColor={ThemeColor.titleTextColor}
          height={190}
        >
          <Text style={styles.title}>{title}</Text>
        </Header>
        <Summary moves={exercise.length} time={duration} format={`Sitting`}></Summary>
      </Pressable>
      <View style={styles.moves}>
        <FlatList
          contentContainerStyle={{
            paddingTop: Platform.OS === 'android' ? 121 : 135,
            backgroundColor: '#FFFBED',
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
    color: ThemeColor.titleTextColor,
    marginTop: 13,
    fontFamily: 'NotoSansBold',
    transform: [{ scaleX: 0.875 }],
  },
  moves: {
    flex: 1,
  },
})
