import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { CalendarProvider, WeekCalendar as Week } from 'react-native-calendars'
import { useNavigation } from '@react-navigation/native'
import ThemeColor from '../Utilities/ThemeColor'

const toYYYYMMDD = (timestamp) => {
  return new Date(timestamp).toISOString().split('T')[0]
}

export default function WeekCalendar({ db, reset }) {
  const navigation = useNavigation()
  const [records, setRecords] = useState({})

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('select * from Record', [], (_, { rows }) => {
        let result = rows._array.reduce(
          (previous, current) => ({
            ...previous,
            [toYYYYMMDD(current.timestamp)]: {
              marked: true,
              dotColor: ThemeColor.secondary,
              customStyles: {
                container: {
                  paddingBottom: 3,
                },
              },
            },
          }),
          {}
        )
        setRecords(result)
        console.log(result)
      })
    })
  }, [reset])

  return (
    <View style={styles.container}>
      <Text style={styles.info}>Your exercise records since 03/08/2023</Text>
      <View style={styles.cardContainer}>
        <View style={styles.insideCardContainer}>
          <View style={styles.summary}>
            <View style={styles.box}>
              <Text style={styles.number}>8888</Text>
              <Text style={styles.text}>Minutes</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.number}>888</Text>
              <Text style={styles.text}>Moves</Text>
            </View>
          </View>
          <View style={styles.bar}></View>
          <View style={styles.calendar}>
            <CalendarProvider date={null}>
              <Week
                markingType={'custom'}
                markedDates={{ ...records }}
                theme={{
                  calendarBackground: ThemeColor.tab,
                  dayTextColor: ThemeColor.text,
                  arrowColor: ThemeColor.text,
                  monthTextColor: ThemeColor.textGray,
                  textMonthFontFamily: 'NotoSansBold',
                  textMonthFontSize: 15,
                  textDayFontFamily: 'NotoSansBold',
                  textDayHeaderFontFamily: 'NotoSans',
                  selectedDayBackgroundColor: ThemeColor.tab,
                }}
              />
            </CalendarProvider>
          </View>
          <View style={styles.bar}></View>
        </View>
        <Pressable style={styles.button} onPress={() => navigation.navigate('History')}>
          <Text style={styles.buttonLetter}>More</Text>
        </Pressable>
      </View>
    </View>
  )
}

// Css
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    transform: [{ scaleX: 0.9 }],
  },
  info: {
    color: ThemeColor.textGray,
    fontFamily: 'NotoSansBold',
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: ThemeColor.primaryDarker,
    borderRadius: 10,
    paddingTop: 6,
    overflow: 'hidden',
  },
  insideCardContainer: {
    backgroundColor: ThemeColor.tab,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: ThemeColor.tab,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    backgroundColor: ThemeColor.spacing,
    height: 1,
    marginHorizontal: 10,
  },
  calendar: {
    height: 80,
    marginBottom: 10,
  },
  button: {
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: ThemeColor.tab,
    paddingVertical: 10,
  },
  buttonLetter: {
    fontFamily: 'NotoSans',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    color: ThemeColor.primaryDarker,
  },
  number: {
    fontSize: 30,
    lineHeight: 32,
    color: ThemeColor.text,
    fontFamily: 'NotoSansExtraBold',
  },
  text: {
    fontSize: 15,
    lineHeight: 17,
    color: ThemeColor.text,
    fontFamily: 'NotoSans',
  },
})
