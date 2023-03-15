import { StyleSheet, View, Text, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import NavBar from './NavBar.js'
import SideMenu from './SideMenu.js'
import ThemeColor from './Utilities/ThemeColor.js'
import PageTemplate from './Utilities/PageTemplate.js'
import ResetIcon from '../assets/icons/reset-icon.svg'
import ResetRightIcon from '../assets/icons/reset-arrow-right.svg'

export default function Setting({ db, resetTrigger }) {
  const [showMenu, setShowMenu] = useState(false)
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
    <PageTemplate>
      <NavBar setShowMenu={setShowMenu} />
      {showMenu && <SideMenu setShowMenu={setShowMenu} />}
      <View style={styles.container}>
        <Text style={styles.title}>Setting</Text>
        <View style={styles.buttonLayout}>
          <Pressable style={styles.resetButton} onPress={removeRecordsAlert}>
            <ResetIcon height={20} width={20} />
            <Text style={styles.resetText}>Reset</Text>
            <View style={styles.resetRightIcon}>
              <ResetRightIcon height={20} width={20} />
            </View>
          </Pressable>
        </View>
      </View>
    </PageTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    color: ThemeColor.textColor[colorScheme],
    backgroundColor: '#FFFBED',
    flex: 1,
    width: null,
    height: null,
  },
  title: {
    color: ThemeColor.textColor,
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingLeft: 20,
  },
  buttonLayout: {
    color: ThemeColor.textColor[colorScheme],
    padding: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  resetButton: {
    color: ThemeColor.textColor[colorScheme],
    backgroundColor: '#FFF',
    borderRadius: 10,
    height: 70,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    // for android
    elevation: 2,
  },
  resetText: {
    color: ThemeColor.textColor[colorScheme],
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  resetRightIcon: {
    color: ThemeColor.textColor[colorScheme],
    marginLeft: 'auto',
    justifyContent: 'center',
  },
})
