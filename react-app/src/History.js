import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Appearance } from 'react-native'
import { Calendar } from 'react-native-calendars'
import NavBar from './NavBar.js'
import SideMenu from './SideMenu.js'
import ThemeColor from './Utilities/ThemeColor.js'
import moment from 'moment'
import * as SQLite from 'expo-sqlite'

export default function History({ debugMessage }) {
  const [showMenu, setShowMenu] = useState(false)
  const [debugMessageHistory, setDebugMessageHistory] = useState('')
  const styleCalSetting = { selected: true }
  const initialDay = moment().format('YYYY-MM-DD')
  const [records, setRecords] = useState([])
  const [selected, setSelected] = useState(initialDay)
  const [historyData, setHistoryData] = useState([])
  const db = SQLite.openDatabase('shelter.db')

  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `SELECT * FROM Record;`,
          [],
          (_, { rows }) => {
            setRecords(rows._array)
          },
          (tx, error) => {
            setDebugMessageHistory('select failed' + error)
            return false
          }
        )
      },
      (error) => {
        setDebugMessageHistory('tx failed' + error)
      }
    )
  }, [])

  useEffect(() => {
    const tmpSpecificData = records.filter((record) => selected === record.timestamp)
    setHistoryData(tmpSpecificData)
  }, [selected])

  if (__DEV__) {
    useEffect(() => {
      alert(debugMessage)
      setDebugMessageHistory('select result:' + JSON.stringify(debugMessage))
    }, [debugMessage])
  }

  // for the day user select
  const selectedDay = (date) => {
    setSelected(date.dateString)
  }

  // to mark the days user has histories
  const markedDays = () => {
    const markedDaysObj = {}
    markedDaysObj[selected] = styleCalSetting
    records.forEach(function (value) {
      const markedDay = value.timestamp
      markedDaysObj[markedDay] = styleCalSetting
    })
    return markedDaysObj
  }

  // format for view ('YYYY年MM月DD日')
  const FormatDate = ({ timestamp }) => {
    const splitDate = timestamp.split('-')
    const dateStr = splitDate[0] + '年' + splitDate[1] + '月' + splitDate[2] + '日'
    return dateStr
  }

  return (
    <View style={styles.container}>
      <NavBar setShowMenu={setShowMenu} />
      {showMenu && <SideMenu setShowMenu={setShowMenu} />}
      <Text>Coming soon ... </Text>

      <View style={styles.calendar}>
        {/* Calendar */}
        <Calendar
          current={initialDay}
          markedDates={markedDays(selected)}
          onDayPress={(day) => {
            selectedDay(day)
          }}
        />
        {/* Text of the record */}
        <Text style={styles.title}>Records</Text>
        <FlatList
          data={historyData}
          renderItem={({ item }) => (
            <View style={styles.recordInfo}>
              <Text style={styles.recordText}>
                <FormatDate timestamp={item.timestamp} />
              </Text>
              <Text style={styles.recordDate}>{item.exercise_name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}

// Css
const colorScheme = Appearance.getColorScheme()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColor.backgroundColor[colorScheme],
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  calendar: {
    marginTop: 110,
    ...StyleSheet.absoluteFillObject,
    padding: 10,
  },
  title: {
    margin: 15,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: ThemeColor.textColor[colorScheme],
  },
  recordInfo: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  recordDate: {
    margin: 9,
    paddingRight: 20,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#34495e',
  },
  recordText: {
    margin: 9,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
    color: ThemeColor.textColor[colorScheme],
  },
})
