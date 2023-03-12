import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Appearance, SafeAreaView, Button } from 'react-native'
import { Calendar } from 'react-native-calendars'
import NavBar from './NavBar.js'
import SideMenu from './SideMenu.js'
import ThemeColor from './Utilities/ThemeColor.js'

const toYYYYMMDD = (timestamp) => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  let month = '' + (date.getMonth() + 1)
  let day = '' + date.getDate()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('-')
}

export default function History({ db }) {
  const [showMenu, setShowMenu] = useState(false)
  const [records, setRecords] = useState({})
  const today = toYYYYMMDD(new Date().getTime())
  const [selected, setSelected] = useState({ [today]: { selected: true } })
  const [recordsOfSelected, setRecordsOfSelected] = useState([])

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('select * from Record', [], (_, { rows }) => {
        let result = rows._array.reduce(
          (previous, current) => ({
            ...previous,
            [toYYYYMMDD(current.timestamp)]: { marked: true },
          }),
          {}
        )
        setRecords(result)
      })
    })
    const localDay = new Date().setUTCHours(0, 0, 0, 0) + 7 * 60 * 60 * 1000
    db.transaction((tx) => {
      tx.executeSql(
        'select timestamp, exercise_name from Record where timestamp between ? and ? order by timestamp',
        [localDay, localDay + 24 * 60 * 60 * 1000 - 1],
        (_, { rows }) => {
          setRecordsOfSelected(rows._array)
        }
      )
    })
  }, [])

  // format for view ('YYYY年MM月DD日 HH:MM')
  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
    return `${year}年${month}月${day}日 ${hour}:${minute}`
  }

  return (
    <View style={styles.upperWrapper}>
      <SafeAreaView />
      <SafeAreaView style={styles.lowerWrapper}>
        <NavBar setShowMenu={setShowMenu} />
        {showMenu && <SideMenu setShowMenu={setShowMenu} />}
        <View style={styles.calendar}>
          <Calendar
            markedDates={{ ...records, ...selected }}
            onDayPress={(day) => {
              const localDay = day.timestamp + 7 * 60 * 60 * 1000
              // 7 * 60 * 60 * 1000 is the time difference between Vancouver time to UTC. Should consider not hard coded in the future.
              setSelected({ [day.dateString]: { selected: true } })
              db.transaction((tx) => {
                tx.executeSql(
                  'select timestamp, exercise_name from Record where timestamp between ? and ? order by timestamp',
                  [localDay, localDay + 24 * 60 * 60 * 1000 - 1],
                  (_, { rows }) => {
                    setRecordsOfSelected(rows._array)
                  }
                )
              })
            }}
            hideExtraDays={true}
            theme={{
              calendarBackground: ThemeColor.backgroundColor[colorScheme],
              dayTextColor: ThemeColor.textColor[colorScheme],
              arrowColor: ThemeColor.textColor[colorScheme],
              monthTextColor: ThemeColor.textColor[colorScheme],
            }}
          />
          {__DEV__ && (
            <Button
              title='PRESS TO ADD RANDOM DATA'
              color='#841584'
              onPress={() => {
                db.transaction((tx) => {
                  const randomTimeInMarch = Math.floor(
                    Math.random() * (1680307200000 - 1677628800000) + 1677628800000
                  )
                  tx.executeSql('insert into Record (exercise_name, timestamp) values (?, ?)', [
                    'just for testing',
                    randomTimeInMarch,
                  ])
                })
                db.transaction((tx) => {
                  tx.executeSql('select * from Record', [], (_, { rows }) => {
                    let result = rows._array.reduce(
                      (previous, current) => ({
                        ...previous,
                        [toYYYYMMDD(current.timestamp)]: { marked: true },
                      }),
                      {}
                    )
                    setRecords(result)
                  })
                })
              }}
            />
          )}
          {/* Text of the record */}
          <Text style={styles.title}>Records</Text>
          <FlatList
            data={recordsOfSelected}
            renderItem={({ item }) => (
              <View style={styles.recordInfo}>
                <Text style={styles.recordText}>{formatDate(item.timestamp)}</Text>
                <Text style={styles.recordText}>{item.exercise_name}</Text>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}

// Css
const colorScheme = Appearance.getColorScheme()

const styles = StyleSheet.create({
  upperWrapper: {
    flex: 1,
    backgroundColor: ThemeColor.componentColor[colorScheme],
    paddingTop: 35,
  },
  lowerWrapper: {
    flex: 1,
    backgroundColor: ThemeColor.backgroundColor[colorScheme],
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  calendar: {
    marginTop: 80,
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: 15,
  },
  title: {
    margin: 15,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: ThemeColor.textColor[colorScheme],
  },
  recordInfo: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  recordText: {
    margin: 9,
    fontSize: 12,
    fontWeight: 'bold',
    color: ThemeColor.textColor[colorScheme],
  },
})
