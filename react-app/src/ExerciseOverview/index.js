import { FlatList, Pressable, Platform, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Header from '../Utilities/Header'
import Summary from './Summary'
import ExerciseCard from './ExerciseCard'
import StartExerciseButton from './StartExerciseButton'
import { STRETCHING_EXERCISE_DATA } from '../../data/StretchingExerciseData'
import PageTemplate from '../Utilities/PageTemplate'
import ExerciseDetail from './ExerciseDetail'
import ThemeColor from '../Utilities/ThemeColor'

export default function ExerciseOverview() {
  const [showDetail, setShowDetail] = React.useState(false)
  const [selectedItem, setSelectedItem] = useState({})

  const handlePress = (item) => {
    setSelectedItem(item)
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
          <Text style={styles.title}>Stretching on the Seat</Text>
        </Header>
        <Summary moves={STRETCHING_EXERCISE_DATA.length} time={`10`} format={`Sitting`}></Summary>
      </Pressable>
      <FlatList
        contentContainerStyle={{
          paddingTop: Platform.OS === 'android' ? 76 : 90,
          backgroundColor: '#FFFBED',
        }}
        data={STRETCHING_EXERCISE_DATA}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item)}>
            <ExerciseCard title={item.title} description={item.description} image={item.image} />
          </Pressable>
        )}
      />
      <StartExerciseButton />
      {showDetail && <ExerciseDetail item={selectedItem} setShowDetail={setShowDetail} />}
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
})
