import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import NavBar from './NavBar.js'

export default function History() {
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
      <StatusBar style='auto' />
      <NavBar />
      <View style={styles.calendar}>
        {/* Calendar */}
        <Calendar markedDates={marked} />
        {/* Text of the record */}
        <Text style={styles.title}>Records</Text>
        <View style={styles.recordInfo}>
          <Text style={styles.recordDate}>2023年2月23日</Text>
          <Text style={styles.recordText}>Standard stretching</Text>
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
    // to reviewers
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // bottom: 0,
    // left: 0,
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
