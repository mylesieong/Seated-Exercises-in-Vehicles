import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ThemeColor from '../Utilities/ThemeColor'
import TimeIcon from '../../assets/icons/time.svg'
import TrainingIcon from '../../assets/icons/training.svg'

export default function TodaySummary({ records, exercises }) {
  const [moveTotal, setMoveTotal] = useState(0)
  const [durationTotal, setDurationTotal] = useState(0)

  useEffect(() => {
    const moveTotal =
      records.length > 0
        ? records.reduce((total, record) => {
            return (
              total + (exercises[record.exercise_name] ? exercises[record.exercise_name].moves : 0)
            )
          }, 0)
        : 0
    const durationTotal =
      records.length > 0
        ? records.reduce((total, record) => {
            return (
              total +
              (exercises[record.exercise_name] ? exercises[record.exercise_name]?.duration : 0)
            )
          }, 0)
        : 0
    setMoveTotal(moveTotal)
    setDurationTotal(durationTotal)
  }, [records])

  return (
    <View style={{ flex: 1 }}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    lineHeight: 24,
    color: ThemeColor.text,
    marginTop: 12,
    marginLeft: 20,
    fontFamily: 'NotoSansExtraBold',
  },
  squares: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
    columnGap: 15,
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
