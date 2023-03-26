import { Pressable, StyleSheet, Text, View, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { CalendarProvider, WeekCalendar as Week } from 'react-native-calendars'
import { useNavigation } from '@react-navigation/native'
import ThemeColor from '../Utilities/ThemeColor'

export default function WeekCalendar({ startDate, records, exercises }) {
  const navigation = useNavigation()
  const [moveTotal, setMoveTotal] = useState(0)
  const [durationTotal, setDurationTotal] = useState(0)
  const [calendarRecords, setCalendarRecords] = useState({})
  const toYYYYMMDD = (timestamp) => {
    return new Date(timestamp).toISOString().split('T')[0]
  }

  useEffect(() => {
    const moveTotal =
      records.length > 0
        ? records.reduce((total, record) => {
            return (
              total + (exercises[record.exercise_name] ? exercises[record.exercise_name].moves : 0)
            )
          }, 0)
        : 0
    const durationTotal =
      records.length > 0
        ? records.reduce((total, record) => {
            return (
              total +
              (exercises[record.exercise_name] ? exercises[record.exercise_name]?.duration : 0)
            )
          }, 0)
        : 0
    setMoveTotal(moveTotal)
    setDurationTotal(durationTotal)

    const newCalendarRecords = records.reduce(
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
    setCalendarRecords(newCalendarRecords)
  }, [records])

  return (
    <View style={styles.container}>
      {startDate ? (
        <Text style={styles.info}>You have been exercising since {startDate}</Text>
      ) : (
        <Text style={styles.info}>You have not started exercising yet</Text>
      )}
      <View style={styles.cardContainer}>
        <View style={styles.insideCardContainer}>
          <View style={styles.summary}>
            <View style={styles.box}>
              <Text style={styles.number}>{durationTotal}</Text>
              <Text style={styles.text}>Minutes</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.number}>{moveTotal}</Text>
              <Text style={styles.text}>Moves</Text>
            </View>
          </View>
          <View style={styles.bar}></View>
          <View style={styles.calendar}>
            <CalendarProvider date={new Date().toISOString().split('T')[0]}>
              <Week
                markingType={'custom'}
                markedDates={{ ...calendarRecords }}
                theme={{
                  calendarBackground: ThemeColor.tab,
                  dayTextColor: ThemeColor.text,
                  arrowColor: ThemeColor.text,
                  monthTextColor: ThemeColor.textGray,
                  textMonthFontFamily: 'NotoSansBasicBold',
                  textMonthFontSize: 15,
                  textDayFontFamily: 'NotoSansBasicBold',
                  textDayHeaderFontFamily: 'NotoSansBasic',
                  selectedDayBackgroundColor: ThemeColor.tab,
                  selectedDayTextColor: ThemeColor.text,
                  stylesheet: {
                    expandable: {
                      main: {
                        containerShadow: {
                          ...Platform.select({
                            ios: {
                              shadowOpacity: 0,
                              zIndex: 0,
                            },
                            android: {
                              elevation: 3,
                            },
                          }),
                        },
                        containerWrapper: {
                          paddingBottom: 0,
                        },
                      },
                    },
                  },
                }}
                onDayPress={(day) => {
                  navigation.navigate('History', { selectedDay: day })
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
    fontFamily: 'NotoSansBasicBold',
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
  },
  button: {
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: ThemeColor.tab,
    paddingVertical: 10,
  },
  buttonLetter: {
    fontFamily: 'NotoSansBasic',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    color: ThemeColor.primaryDarker,
  },
  number: {
    fontSize: 30,
    lineHeight: 32,
    color: ThemeColor.text,
    fontFamily: 'NotoSansBasicExtraBold',
  },
  text: {
    fontSize: 15,
    lineHeight: 17,
    color: ThemeColor.text,
    fontFamily: 'NotoSansBasic',
  },
})
