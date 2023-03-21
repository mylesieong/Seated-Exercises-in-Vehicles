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
      dots: [{ selectedDotColor: '#FFFFFF' }],
      customStyles: {
        container: {
          borderRadius: 3,
          backgroundColor: '#FFCD28',
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
            [toYYYYMMDD(current.timestamp)]: { marked: true, dotColor: '#2196F3' },
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
    <PageTemplate topBarColor={ThemeColor.backgroundColor}>
      <Header navigation={'Home'} height={46}>
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
                  selectedColor: '#FFCD28',
                  dots: [{ selectedDotColor: '#FFFFFF' }],
                  customStyles: {
                    container: {
                      borderRadius: 3,
                      backgroundColor: '#FFCD28',
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
              calendarBackground: ThemeColor.contrastColor,
              dayTextColor: ThemeColor.textColor,
              arrowColor: ThemeColor.textColor,
              monthTextColor: ThemeColor.textGrey,
              textMonthFontFamily: 'NotoSansBold',
              textMonthFontSize: 15,
              textDayFontFamily: 'NotoSansBold',
              textDayHeaderFontFamily: 'NotoSans',
              selectedDayBackgroundColor: '#FFCD28',
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
          {__DEV__ && (
            <Button
              title='PRESS TO ADD 100 RANDOM DATA'
              color='#841584'
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
                        [toYYYYMMDD(current.timestamp)]: { marked: true, dotColor: '#2196F3' },
                      }),
                      {}
                    )
                    setRecords(result)
                  })
                })
              }}
            />
          )}
          {__DEV__ && (
            <Button
              title='console log'
              color='#005408'
              onPress={() => {
                console.log(recordsOfSelected)
              }}
            />
          )}
        </View>
      </View>
    </PageTemplate>
  )
}

// Css
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    lineHeight: 24,
    color: ThemeColor.textColor,
    marginTop: 12,
    fontFamily: 'NotoSansExtraBold',
    transform: [{ scaleX: 0.75 }],
  },
  container: {
    marginTop: 20,
    flex: 1,
  },
  calendar: {
    borderColor: ThemeColor.backgroundColor,
    backgroundColor: '#FFB300',
    borderRadius: 10,
    marginHorizontal: 20,
    paddingTop: 6,
    overflow: 'hidden',
  },
  textTitle: {
    marginTop: 30,
    lineHeight: 20,
    fontSize: 15,
    fontFamily: 'NotoSansBold',
    transform: [{ scaleX: 0.875 }],
    color: ThemeColor.textGrey,
  },
  recordList: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  recordContainer: {
    backgroundColor: ThemeColor.contrastColor,
    borderColor: ThemeColor.backgroundColor,
    borderBottomColor: '#F5F5F5',
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
    color: ThemeColor.textColor,
  },
  timeStamp: {
    paddingRight: 15,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'NotoSans',
    transform: [{ scaleX: 0.875 }],
    color: ThemeColor.textColor,
  },
  exerciseDetail: {
    marginLeft: -7.5,
    marginBottom: 11,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'NotoSans',
    transform: [{ scaleX: 0.875 }],
    color: ThemeColor.textColor,
  },
  hide: {
    display: 'none',
  },
  bar: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginHorizontal: 15,
  },
})
