import React from 'react'
import { StyleSheet, Text } from 'react-native'
import PageTemplate from '../Utilities/PageTemplate'
import Header from '../Utilities/Header'
import ThemeColor from '../Utilities/ThemeColor'
import TodaySummary from './TodaySummary'
import Setting from '../Setting'

export default function Mine({ db, setReset, reset }) {
  return (
    <PageTemplate topBarColor={ThemeColor.deepBackground} bottomColor={ThemeColor.deepBackground}>
      <Header navigation={'Home'} height={46} backgroundColor={ThemeColor.deepBackground}>
        <Text style={styles.title}>Mine</Text>
      </Header>
      <TodaySummary db={db} reset={reset} />
      <Setting db={db} setReset={setReset} reset={reset} />
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
    transform: [{ scaleX: 0.75 }],
  },
})
