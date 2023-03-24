import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PageTemplate from '../Utilities/PageTemplate'
import ThemeColor from '../Utilities/ThemeColor'
import { CORE_EXERCISE_DATA } from '../../data/CoreExerciseData'
import { STRETCHING_EXERCISE_DATA } from '../../data/StretchingExerciseData'
import TimeIcon from '../../assets/icons/time.svg'
import TrainingIcon from '../../assets/icons/training.svg'

export default function TodaySummary({ db, reset }) {
  const [records, setRecords] = useState([])
  const exercises = { Stretching: {}, 'Core Exercise': {} }
  exercises['Stretching'].duration = Math.ceil(
    STRETCHING_EXERCISE_DATA.reduce(
      (accumulation, currentMove) => accumulation + currentMove.duration,
      0
    ) / 60
  )
  exercises['Stretching'].moves = STRETCHING_EXERCISE_DATA.length
  exercises['Core Exercise'].duration = Math.ceil(
    CORE_EXERCISE_DATA.reduce(
      (accumulation, currentMove) => accumulation + currentMove.duration,
      0
    ) / 60
  )
  exercises['Core Exercise'].moves = CORE_EXERCISE_DATA.length

  useEffect(() => {
    const localStartOfDay = new Date().setHours(0, 0, 0, 0)
    db.transaction((tx) => {
      tx.executeSql(
        'select timestamp, exercise_name from Record where timestamp between ? and ? order by timestamp',
        [localStartOfDay, localStartOfDay + 24 * 60 * 60 * 1000 - 1],
        (_, { rows }) => {
          setRecords(rows._array)
        }
      )
    })
  }, [reset])
  console.log(records)
  const moveTotal =
    records.length > 0
      ? records.reduce((total, record) => {
          return total + exercises[record.exercise_name] ? exercises[record.exercise_name] : 0
        }, 0)
      : 0
  const durationTotal =
    records.length > 0
      ? records.reduce((total, record) => {
          return total + exercises[record.exercise_name]
            ? exercises[record.exercise_name]?.duration
            : 0
        }, 0)
      : 0

  return (
    <PageTemplate topBarColor={ThemeColor.deepBackground} bottomColor={ThemeColor.deepBackground}>
      <Text style={styles.title}>Today</Text>
      <View style={styles.squares}>
        <View style={styles.square}>
          <TimeIcon style={styles.icon} />
          <Text style={styles.number}>{durationTotal}</Text>
          <Text style={styles.text}>Minutes</Text>
        </View>
        <View style={styles.square}>
          <TrainingIcon style={styles.icon} />
          <Text style={styles.number}>{moveTotal}</Text>
          <Text style={styles.text}>Moves</Text>
        </View>
      </View>
    </PageTemplate>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    lineHeight: 24,
    color: ThemeColor.text,
    marginTop: 12,
    fontFamily: 'NotoSansExtraBold',
    transform: [{ scaleX: 0.75 }],
  },
  squares: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
    columnGap: '15%',
  },
  square: {
    flex: 1,
    height: 110,
    backgroundColor: ThemeColor.primaryLighter,
    borderRadius: 8,
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
    alignSelf: 'flex-start',
  },
  number: {
    fontSize: 30,
    lineHeight: 32,
    color: ThemeColor.textWhite,
    fontFamily: 'NotoSansExtraBold',
  },
  text: {
    fontSize: 15,
    lineHeight: 17,
    color: ThemeColor.textWhite,
    fontFamily: 'NotoSans',
  },
})
