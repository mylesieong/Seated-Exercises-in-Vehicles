import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Calendar } from 'react-native-calendars'
import NavBar from './NavBar.js'
import SideMenu from './SideMenu.js'

export default function History({ debugMessage }) {
  const [showMenu, setShowMenu] = useState(false)
  const [debugMessageHistory, setDebugMessageHistory] = useState('')

  if (__DEV__) {
    useEffect(() => {
      alert(debugMessage)
      setDebugMessageHistory('select result:' + JSON.stringify(debugMessage))
    }, [debugMessage])
  }

  // format for a date
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
    return <Text style={styles.recordDate}>{format}</Text>
  }

  // marked the days
  const marked = {
    '2023-02-18': { selected: true },
    '2023-02-19': { selected: true },
    '2023-02-23': { selected: true },
    '2023-03-12': { selected: true },
    '2023-03-14': { selected: true },
  }

  return (
    <View style={styles.container}>
      <NavBar setShowMenu={setShowMenu} />
      {showMenu && <SideMenu setShowMenu={setShowMenu} />}
      <Text>Coming soon ... </Text>

      <View style={styles.calendar}>
        {/* Calendar */}
        <Calendar markedDates={marked} />
        {/* Text of the record */}
        <Text style={styles.title}>Records</Text>
        <FlatList
          data={debugMessage}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.recordInfo}>
              <FormatDate timestamp={item.timestamp} format='YYYY年MM月DD日' />
              <Text style={styles.recordText}>{item.exercise_name} </Text>
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
