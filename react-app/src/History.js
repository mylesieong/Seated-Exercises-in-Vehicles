import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import { Calendar } from 'react-native-calendars'
import Header from './Utilities/Header.js'
import ThemeColor from './Utilities/ThemeColor.js'
import PageTemplate from './Utilities/PageTemplate.js'

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

export default function History({ db, reset }) {
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
    <PageTemplate
      topBarColor={ThemeColor.deepBackground}
      bottomColor={recordsOfSelected[0] ? ThemeColor.component : ThemeColor.deepBackground}
    >
      <Header
        navigation={'Home'}
        height={46}
        backgroundColor={ThemeColor.deepBackground}
        buttonColor={ThemeColor.text}
      >
        <Text style={styles.title}>Exercise Record</Text>
      </Header>
      <View style={styles.container}>
        <View style={styles.calendar}>
          <Calendar
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
              calendarBackground: ThemeColor.component,
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
        </View>
        <Text style={[styles.textTitle, !recordsOfSelected[0] && styles.hide]}>
          Exercise Record
        </Text>
        <View style={[styles.recordList, !recordsOfSelected[0] && styles.hide]}>
          <FlatList
            data={recordsOfSelected}
            renderItem={({ item }) => (
              <View style={styles.recordContainer}>
                <View style={styles.recordInfo}>
                  <Text style={styles.exerciseName}>{item.exercise_name}</Text>
                  <Text style={styles.timeStamp}>{formatDate(item.timestamp)}</Text>
                </View>
                <Text style={styles.exerciseDetail}>
                  {STRETCHING_EXERCISE_DATA.length} Moves, 10 minutes
                </Text>
                <View style={styles.bar}></View>
              </View>
            )}
          />
        </View>
        {__DEV__ && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
            }}
          >
            <Button
              title='PRESS TO ADD 100 RANDOM DATA'
              color={ThemeColor.secondary}
              onPress={() => {
                Array(100)
                  .fill(1)
                  .forEach(() => {
                    db.transaction((tx) => {
                      const randomTimeInMarch = Math.floor(
                        Math.random() * (1680307200000 - 1677628800000) + 1677628800000
                      )
                      tx.executeSql('insert into Record (exercise_name, timestamp) values (?, ?)', [
                        'just for testing',
                        randomTimeInMarch,
                      ])
                    })
                  })
                db.transaction((tx) => {
                  tx.executeSql('select * from Record', [], (_, { rows }) => {
                    let result = rows._array.reduce(
                      (previous, current) => ({
                        ...previous,
                        [toYYYYMMDD(current.timestamp)]: {
                          marked: true,
                          dotColor: ThemeColor.secondary,
                        },
                      }),
                      {}
                    )
                    setRecords(result)
                  })
                })
              }}
            />
          </View>
        )}
      </View>
    </PageTemplate>
  )
}

// Css
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    lineHeight: 24,
    color: ThemeColor.text,
    marginTop: 12,
    fontFamily: 'NotoSansExtraBold',
    transform: [{ scaleX: 0.75 }],
  },
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: ThemeColor.deepBackground,
  },
  calendar: {
    backgroundColor: ThemeColor.primaryDarker,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingTop: 6,
    overflow: 'hidden',
  },
  textTitle: {
    marginTop: 30,
    marginBottom: 5,
    lineHeight: 20,
    fontSize: 15,
    fontFamily: 'NotoSansBold',
    transform: [{ scaleX: 0.875 }],
    color: ThemeColor.textGray,
  },
  recordList: {
    backgroundColor: ThemeColor.component,
    flex: 1,
  },
  recordContainer: {
    backgroundColor: ThemeColor.component,
  },
  recordInfo: {
    paddingTop: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 20,
    lineHeight: 20,
    fontFamily: 'NotoSansExtraBold',
    transform: [{ scaleX: 0.75 }],
    color: ThemeColor.text,
  },
  timeStamp: {
    paddingRight: 15,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'NotoSans',
    transform: [{ scaleX: 0.875 }],
    color: ThemeColor.text,
  },
  exerciseDetail: {
    marginBottom: 11,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'NotoSans',
    transform: [{ scaleX: 0.875 }],
    color: ThemeColor.text,
  },
  hide: {
    display: 'none',
  },
  bar: {
    height: 1,
    backgroundColor: ThemeColor.spacing,
    marginHorizontal: 15,
  },
})
