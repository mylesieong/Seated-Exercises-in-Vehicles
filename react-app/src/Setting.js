import { StyleSheet, View, Text, Pressable, Alert } from 'react-native'
import React from 'react'
import ThemeColor from './Utilities/ThemeColor.js'
import PageTemplate from './Utilities/PageTemplate.js'
import Header from './Utilities/Header.js'
import ResetIcon from '../assets/icons/reset-icon.svg'
import ResetRightIcon from '../assets/icons/reset-arrow-right.svg'

export default function Setting({ db, resetTrigger }) {
  const removeRecordsAlert = () => {
    Alert.alert('Remove all records', 'Once you delete all records, it cannot be undone', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'OK', onPress: () => clearRecords() },
    ])
  }

  const clearRecords = () => {
    db.transaction((tx) => {
      tx.executeSql(`DELETE FROM Record;`), [], resetTrigger()
    })
  }

  return (
    <PageTemplate topBarColor={ThemeColor.deepBackground} bottomColor={ThemeColor.deepBackground}>
      <Header navigation={'Home'} height={46} backgroundColor={ThemeColor.deepBackground}>
        <Text style={styles.headerTitle}>Exercise Record</Text>
      </Header>
      <View style={styles.container}>
        <Text style={styles.title}>Setting</Text>
        <View style={styles.buttonLayout}>
          <Pressable style={styles.resetButton} onPress={removeRecordsAlert}>
            <ResetIcon height={20} width={20} color={ThemeColor.text} />
            <Text style={styles.resetText}>Reset</Text>
            <View style={styles.resetRightIcon}>
              <ResetRightIcon height={20} width={20} color={ThemeColor.text} />
            </View>
          </Pressable>
        </View>
      </View>
    </PageTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeColor.deepBackground,
    flex: 1,
  },
  title: {
    color: ThemeColor.text,
    fontSize: 28,
    paddingLeft: 4,
    paddingTop: 20,
    lineHeight: 32,
    fontFamily: 'NotoSansExtraBold',
    transform: [{ scaleX: 0.9 }],
  },

  resetButton: {
    backgroundColor: ThemeColor.component,
    borderRadius: 10,
    height: 70,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowColor: ThemeColor.shadow,
    // for android
    elevation: 5,
  },
  resetText: {
    fontSize: 20,
    paddingLeft: 10,
    lineHeight: 24,
    fontFamily: 'NotoSansExtraBold',
    transform: [{ scaleX: 0.75 }],
    color: ThemeColor.text,
  },
  resetRightIcon: {
    marginLeft: 'auto',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    lineHeight: 24,
    color: ThemeColor.text,
    marginTop: 12,
    fontFamily: 'NotoSansExtraBold',
    transform: [{ scaleX: 0.75 }],
  },
})
