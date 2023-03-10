import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Calendar } from 'react-native-calendars'
import NavBar from './NavBar.js'
import SideMenu from './SideMenu.js'
import moment from 'moment'

export default function History({ debugMessage }) {
  const [showMenu, setShowMenu] = useState(false)
  const [debugMessageHistory, setDebugMessageHistory] = useState('')
  const styleCalSetting = { selected: true }
  const initialDay = moment().format('YYYY-MM-DD')
  const [selected, setSelected] = useState(initialDay)
  const [historyData, setHistoryData] = useState([])

  if (__DEV__) {
    useEffect(() => {
      alert(debugMessage)
      setDebugMessageHistory('select result:' + JSON.stringify(debugMessage))
    }, [debugMessage])
  }

  // for the day user select
  const selectedDay = (date) => {
    // initialize
    setHistoryData('')
    setSelected(date.dateString)
    var tmpSpecificData = []
    debugMessage.forEach(function (value) {
      if (date.dateString == FormatForCalender(value.timestamp, 'yyyy-mm-dd')) {
        var data = Object.assign({
          timestamp: value.timestamp,
          exercise_name: value.exercise_name,
        })
        tmpSpecificData.push(data)
      }
    })
    setHistoryData(tmpSpecificData)
  }

  // to mark the days user has histories
  const markedDays = () => {
    var markedDaysObj = {}
    markedDaysObj[selected] = styleCalSetting
    debugMessage.forEach(function (value) {
      var markedDay = FormatForCalender(value.timestamp, 'yyyy-mm-dd')
      markedDaysObj[markedDay] = styleCalSetting
    })
    return markedDaysObj
  }

  // format for setting of calender ('yyyy-mm-dd')
  const FormatForCalender = (timestamp, format) => {
    const str_date = timestamp.toString()
    const year = str_date.substring(0, 4)
    const month = str_date.substring(4, 6)
    const day = str_date.substring(6, 8)
    format = format.replace(/yyyy/, year)
    format = format.replace(/mm/, month)
    format = format.replace(/dd/, day)
    return format
  }

  // format for view ('YYYY年MM月DD日')
  const FormatDate = ({ timestamp, format }) => {
    const str_date = timestamp.toString()
    const year = str_date.substring(0, 4)
    var month = str_date.substring(4, 6)
    // to avoid such as 01 or 02 etc for month
    if (month.substring(0, 1) == 0) {
      month = month.substring(1, 2)
    }
    const day = str_date.substring(6, 8)
    format = format.replace(/YYYY/, year)
    format = format.replace(/MM/, month)
    format = format.replace(/DD/, day)
    return format
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
                <FormatDate timestamp={item.timestamp} format='YYYY年MM月DD日' />
              </Text>
              <Text style={styles.recordDate}>{item.exercise_name}</Text>
            </View>
          )}
        />
        {/* debug */}
        {__DEV__ && (
          <Text style={styles.recordInfo} selectable={true}>
            {' '}
            {debugMessageHistory}{' '}
          </Text>
        )}
      </View>
    </View>
  )
}

// Css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    color: '#34495e',
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
    color: '#34495e',
  },
})
