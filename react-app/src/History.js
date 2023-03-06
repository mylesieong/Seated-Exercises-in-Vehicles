import { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import NavBar from './NavBar.js'
import SideMenu from './SideMenu.js'

export default function History({ debugMessage }) {
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    alert(debugMessage)
  }, [debugMessage])

  // marked the days
  const marked = {
    '2023-02-18': { selected: true },
    '2023-02-19': { selected: true },
    '2023-02-23': { selected: true },
    '2023-03-12': { selected: true },
    '2023-03-14': { selected: true }
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
        <View style={styles.recordInfo}>
          <Text style={styles.recordDate}>2023年2月23日</Text>
          <Text style={styles.recordText}>Standard </Text>
          <Text style={styles.recordText} selectable={true}>
            {' '}
            {debugMessage}{' '}
          </Text>
        </View>
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
    alignSelf: 'stretch'
  },
  calendar: {
    marginTop: 110,
    ...StyleSheet.absoluteFillObject,
    padding: 10
  },
  title: {
    margin: 15,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e'
  },
  recordInfo: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  recordDate: {
    margin: 9,
    paddingRight: 18,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#34495e'
  },
  recordText: {
    margin: 9,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#34495e'
  }
})
