import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import { Calendar } from 'react-native-calendars'
import NavBar from './NavBar.js'
import SideMenu from './SideMenu.js'
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
  const [showMenu, setShowMenu] = useState(false)
  const [records, setRecords] = useState({})
  const today = toYYYYMMDD(new Date().getTime())
  const [selected, setSelected] = useState({
    [today]: { selected: true, selectedColor: '#FFCD28' },
  })
  const [recordsOfSelected, setRecordsOfSelected] = useState([])

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('select * from Record', [], (_, { rows }) => {
        let result = rows._array.reduce(
          (previous, current) => ({
            ...previous,
            [toYYYYMMDD(current.timestamp)]: { marked: true, selectedColor: '#FFCD28' },
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
      <NavBar setShowMenu={setShowMenu} navbarColor={ThemeColor.backgroundColor} />
      {showMenu && <SideMenu setShowMenu={setShowMenu} />}
      <View style={styles.container}>
        <View style={styles.calendarContainer}>
          <View style={styles.calendar}>
            <Calendar
              markedDates={{ ...records, ...selected }}
              onDayPress={(day) => {
                const localTimestamp = day.timestamp + new Date().getTimezoneOffset() * 60 * 1000
                setSelected({
                  [day.dateString]: {
                    selected: true,
                    dotColor: 'blue',
                    selectedColor: '#FFCD28',
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
                calendarBackground: ThemeColor.backgroundColor,
                dayTextColor: ThemeColor.textColor,
                arrowColor: ThemeColor.textColor,
                monthTextColor: ThemeColor.textColor,
              }}
            />
          </View>
          <Text style={styles.textTitle}>Exercise Record</Text>
        </View>
        {/* Text of the record */}
        <View>
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
                        [toYYYYMMDD(current.timestamp)]: { marked: true, selectedColor: '#FFCD28' },
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
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  calendarContainer: {
    marginTop: 50,
    paddingVertical: 10,
    backgroundColor: '#FFFBED',
    height: 370,
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
    padding: 10,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#979797',
  },
  recordContainer: {
    borderWidth: 3,
    borderColor: ThemeColor.backgroundColor,
    borderBottomColor: '#F5F5F5',
    marginLeft: 20,
    marginRight: 20,
  },
  recordInfo: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: ThemeColor.textColor,
  },
  timeStamp: {
    fontSize: 15,
    textAlign: 'right',
    color: ThemeColor.textColor,
  },
  exerciseDetail: {
    paddingLeft: 10,
    paddingBottom: 10,
    fontSize: 15,
    color: ThemeColor.textColor,
  },
  hide: {
    display: 'none',
  },
})
