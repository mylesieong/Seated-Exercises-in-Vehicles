import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import ThemeColor from './Utilities/ThemeColor.js'
import { CalendarProvider, ExpandableCalendar } from 'react-native-calendars'

import { STRETCHING_EXERCISE_DATA } from '../data/StretchingExerciseData'

const toYYYYMMDD = (timestamp) => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  let month = '' + (date.getMonth() + 1)
  let day = '' + date.getDate()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

// format for view ('HH:MM')
const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minute = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
  return `${hour}:${minute}`
}

export default function WeekCalendar({ db, reset }) {
  const [records, setRecords] = useState({})
  const today = toYYYYMMDD(new Date().getTime())
  const [selected, setSelected] = useState({
    [today]: {
      selected: true,
      dots: [{ selectedDotColor: ThemeColor.textWhite }],
      customStyles: {
        container: {
          borderRadius: 3,
          backgroundColor: ThemeColor.primaryDarker,
        },
      },
    },
  })
  const [recordsOfSelected, setRecordsOfSelected] = useState([])

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('select * from Record', [], (_, { rows }) => {
        let result = rows._array.reduce(
          (previous, current) => ({
            ...previous,
            [toYYYYMMDD(current.timestamp)]: { marked: true, dotColor: ThemeColor.secondary },
          }),
          {}
        )
        setRecords(result)
      })
    })
    const localStartOfDay = new Date().setHours(0, 0, 0, 0)
    db.transaction((tx) => {
      tx.executeSql(
        'select timestamp, exercise_name from Record where timestamp between ? and ? order by timestamp',
        [localStartOfDay, localStartOfDay + 24 * 60 * 60 * 1000 - 1],
        (_, { rows }) => {
          setRecordsOfSelected(rows._array)
        }
      )
    })
  }, [reset])

  return (
    <View style={styles.container}>
      <Text>You've exercise Record since 03/08/2023</Text>
      <View style={styles.cardContainer}>
        <View style={styles.square}>
          <Text>12 minutes (TodaySummay.js)</Text>
          <Text>3 move</Text>
        </View>
        <View style={styles.calendar}>
          <CalendarProvider date={new Date().toISOString().split('T')[0]}>
            <ExpandableCalendar
              markingType={'custom'}
              markedDates={{ ...records, ...selected }}
              onDayPress={(day) => {
                const localTimestamp = day.timestamp + new Date().getTimezoneOffset() * 60 * 1000
                setSelected({
                  [day.dateString]: {
                    selected: true,
                    selectedColor: ThemeColor.primaryDarker,
                    dots: [{ selectedDotColor: ThemeColor.textWhite }],
                    customStyles: {
                      container: {
                        borderRadius: 3,
                        backgroundColor: ThemeColor.primaryDarker,
                      },
                    },
                  },
                })
                db.transaction((tx) => {
                  tx.executeSql(
                    'select timestamp, exercise_name from Record where timestamp between ? and ? order by timestamp',
                    [localTimestamp, localTimestamp + 24 * 60 * 60 * 1000 - 1],
                    (_, { rows }) => {
                      setRecordsOfSelected(rows._array)
                    }
                  )
                })
              }}
              onMonthChange={() => {
                setRecordsOfSelected([])
              }}
              hideExtraDays={true}
              theme={{
                calendarBackground: ThemeColor.tab,
                dayTextColor: ThemeColor.text,
                arrowColor: ThemeColor.text,
                monthTextColor: ThemeColor.textGray,
                textMonthFontFamily: 'NotoSansBold',
                textMonthFontSize: 15,
                textDayFontFamily: 'NotoSansBold',
                textDayHeaderFontFamily: 'NotoSans',
                selectedDayBackgroundColor: ThemeColor.primaryDarker,
              }}
            />
          </CalendarProvider>
        </View>
      </View>
      <View>
        <Text style={styles.buttonLetter}>More</Text>
      </View>
    </View>
  )
}

// Css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  cardContainer: {
    backgroundColor: ThemeColor.primaryDarker,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingTop: 6,
  },
  square: {
    paddingTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  calendar: {},
  buttonLetter: {
    paddingTop: 6,
  },
})
