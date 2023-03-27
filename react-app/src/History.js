import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Button } from 'react-native'
import { Calendar } from 'react-native-calendars'
import Header from './Utilities/Header.js'
import ThemeColor from './Utilities/ThemeColor.js'
import PageTemplate from './Utilities/PageTemplate.js'
import { useRoute } from '@react-navigation/native'

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

export default function History({ db, reset, setReset, exercises }) {
  const route = useRoute()
  const selectedDay = route.params?.selectedDay.dateString
  const [records, setRecords] = useState({})
  const today = toYYYYMMDD(new Date().getTime())

  const showSelectDay = (recordsObj, day) => {
    const pressDay = day.dateString
    const theDay = pressDay || selectedDay || today
    return {
      ...recordsObj,
      [theDay]: recordsObj[theDay]
        ? {
            ...recordsObj[theDay],
            selected: true,
          }
        : {
            selected: true,
            customStyles: {
              container: {
                borderRadius: 3,
                paddingBottom: 6,
              },
            },
          },
    }
  }

  const [selected, setSelected] = useState({})
  const [recordsOfSelected, setRecordsOfSelected] = useState([])

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('select * from Record', [], (_, { rows }) => {
        let result = rows._array.reduce(
          (previous, current) => ({
            ...previous,
            [toYYYYMMDD(current.timestamp)]: {
              marked: true,
              customStyles: {
                container: {
                  borderRadius: 3,
                  paddingBottom: 6,
                },
              },
            },
          }),
          {}
        )
        setRecords(result)
        setSelected(showSelectDay(result, selectedDay || today))
      })
    })
    const localStartOfDay = route.params
      ? route.params.selectedDay.timestamp + new Date().getTimezoneOffset() * 60 * 1000
      : new Date().setHours(0, 0, 0, 0)
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
    <PageTemplate
      topBarColor={ThemeColor.background}
      bottomColor={ThemeColor.background}
      removeIphoneXFooter={true}
    >
      <Header
        navigation={'Home'}
        height={46}
        backgroundColor={ThemeColor.background}
        buttonColor={ThemeColor.text}
      >
        <Text style={styles.title}>Exercise Record</Text>
      </Header>
      <View style={styles.container}>
        <View style={styles.calendar}>
          <Calendar
            markingType={'custom'}
            markedDates={{ ...selected }}
            onDayPress={(day) => {
              setSelected(showSelectDay(records, day))
              const localTimestamp = day.timestamp + new Date().getTimezoneOffset() * 60 * 1000
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
              calendarBackground: ThemeColor.tab,
              dayTextColor: ThemeColor.text,
              arrowColor: ThemeColor.text,
              monthTextColor: ThemeColor.textGray,
              textMonthFontFamily: 'NotoSansMidBold',
              textMonthFontSize: 15,
              textDayFontFamily: 'NotoSansMidBold',
              textDayHeaderFontFamily: 'NotoSans',
              selectedDayBackgroundColor: ThemeColor.primaryDarker,
              selectedDotColor: ThemeColor.textWhite,
              dotColor: ThemeColor.secondary,
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
                  {exercises[item.exercise_name].moves} Moves,{' '}
                  {exercises[item.exercise_name].duration} minutes
                </Text>
                <View style={styles.bar}></View>
              </View>
            )}
          />
        </View>
        {__DEV__ && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
            }}
          >
            <Button
              title='PRESS TO ADD 30 RANDOM DATA'
              color={ThemeColor.secondary}
              onPress={() => {
                Array(30)
                  .fill(1)
                  .forEach(() => {
                    db.transaction((tx) => {
                      const randomTimeInMarch = Math.floor(
                        Math.random() * (1680307200000 - 1677628800000) + 1677628800000
                      )
                      tx.executeSql('insert into Record (exercise_name, timestamp) values (?, ?)', [
                        ['Stretching', 'Core Exercise'][Math.round(Math.random(1))],
                        randomTimeInMarch,
                      ])
                    })
                  })
                setReset(!reset)
              }}
            />
          </View>
        )}
      </View>
    </PageTemplate>
  )
}

// Css
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    lineHeight: 24,
    color: ThemeColor.text,
    marginTop: 12,
    fontFamily: 'NotoSansExtraBold',
  },
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: ThemeColor.background,
  },
  calendar: {
    backgroundColor: ThemeColor.primaryDarker,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingTop: 6,
    overflow: 'hidden',
  },
  textTitle: {
    marginTop: 30,
    marginBottom: 5,
    lineHeight: 20,
    fontSize: 15,
    fontFamily: 'NotoSansMidBold',
    paddingHorizontal: 15,
    color: ThemeColor.textGray,
  },
  recordList: {
    backgroundColor: ThemeColor.tab,
    flex: 1,
  },
  recordContainer: {
    backgroundColor: ThemeColor.tab,
  },
  recordInfo: {
    paddingTop: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  exerciseName: {
    fontSize: 20,
    lineHeight: 20,
    fontFamily: 'NotoSansExtraBold',
    color: ThemeColor.text,
  },
  timeStamp: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'NotoSansMid',
    color: ThemeColor.text,
  },
  exerciseDetail: {
    marginBottom: 11,
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'NotoSansMid',
    paddingLeft: 15,
    color: ThemeColor.text,
  },
  hide: {
    display: 'none',
  },
  bar: {
    height: 1,
    backgroundColor: ThemeColor.spacing,
    marginHorizontal: 15,
  },
})
