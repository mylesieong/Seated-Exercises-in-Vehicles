import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import PageTemplate from '../Utilities/PageTemplate'
import Header from '../Utilities/Header'
import ThemeColor from '../Utilities/ThemeColor'
import TodaySummary from './TodaySummary'
import Setting from './Setting'
import WeekCalendar from './WeekCalendar'

export default function Mine({ db, setReset, reset, exercises }) {
  const [todayRecords, setTodayRecords] = useState([])
  const [allRecords, setAllRecords] = useState([])
  const [startDate, setStartDate] = useState(null)
  const toYYYYMMDD = (timestamp) => {
    return new Date(timestamp).toISOString().split('T')[0]
  }

  useEffect(() => {
    const localStartOfDay = new Date().setHours(0, 0, 0, 0)
    db.transaction((tx) => {
      tx.executeSql(
        'select timestamp, exercise_name from Record where timestamp between ? and ? order by timestamp',
        [localStartOfDay, localStartOfDay + 24 * 60 * 60 * 1000 - 1],
        (_, { rows }) => {
          setTodayRecords(rows._array)
        }
      )
      tx.executeSql('select * from Record', [], (_, { rows }) => {
        setAllRecords(rows._array)
      })
      tx.executeSql('select Min(timestamp) from Record limit 1', [], (_, { rows }) => {
        if (rows._array[0]['Min(timestamp)'] === null) {
          return
        }
        setStartDate(toYYYYMMDD(rows._array[0]['Min(timestamp)']))
      })
    })
  }, [reset])

  return (
    <PageTemplate topBarColor={ThemeColor.deepBackground} bottomColor={ThemeColor.deepBackground}>
      <ScrollView>
        <Header navigation={'Home'} height={46} backgroundColor={ThemeColor.deepBackground}>
          <Text style={styles.title}>Mine</Text>
        </Header>
        <TodaySummary records={todayRecords} exercises={exercises} />
        <WeekCalendar db={db} records={allRecords} startDate={startDate} exercises={exercises} />
        <Setting db={db} setReset={setReset} reset={reset} />
      </ScrollView>
    </PageTemplate>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    lineHeight: 24,
    color: ThemeColor.text,
    marginTop: 12,
    fontFamily: 'NotoSansExtraBold',
  },
})
