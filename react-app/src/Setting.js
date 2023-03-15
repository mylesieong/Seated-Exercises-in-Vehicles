import { StyleSheet, View, Text, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import NavBar from './NavBar.js'
import SideMenu from './SideMenu.js'
import ThemeColor from './Utilities/ThemeColor.js'
import PageTemplate from './Utilities/PageTemplate.js'

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
      <Text style={styles.title}>General</Text>
      <View style={styles.line}>
        <Text style={styles.text}>Remove all records</Text>
        <Pressable style={styles.button} onPress={removeRecordsAlert}>
          <Text style={styles.text}>Remove</Text>
        </Pressable>
      </View>
    </PageTemplate>
  )
}

const styles = StyleSheet.create({
  title: {
    color: ThemeColor.textColor,
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingLeft: 10,
  },
  text: {
    color: ThemeColor.textColor,
    fontSize: 18,
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#FFCA28',
    borderRadius: 5,
    color: ThemeColor.textColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
})
