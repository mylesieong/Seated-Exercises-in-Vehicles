import { StyleSheet, View, Text, Appearance, Pressable, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import NavBar from './NavBar.js'
import SideMenu from './SideMenu.js'
import ThemeColor from './Utilities/ThemeColor.js'
import { useNavigation } from '@react-navigation/native'

export default function Setting({ db }) {
  const [showMenu, setShowMenu] = useState(false)
  const [debugMessage, setDebugMessage] = useState('')
  const navigation = useNavigation()
  const removeRecordsAlert = () => {
    Alert.alert('Remove all records', 'Once you delete all records, it cannot be undone', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => clearRecords() },
    ])
  }

  const clearRecords = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `DELETE FROM Record;`,
          [],
          (_, rows) => {
            setDebugMessage('drop table success')
          },
          (_, error) => {
            setDebugMessage('select failed' + error)
            if (__DEV__) alert(error)
            return false
          }
        )
      },
      (error) => {
        setDebugMessage('tx failed' + error)
        if (__DEV__) alert(error)
      }
    )
  }

  return (
    <View style={styles.container}>
      <NavBar setShowMenu={setShowMenu} />
      {showMenu && <SideMenu setShowMenu={setShowMenu} />}
      <Text style={styles.title}>General</Text>
      <View style={styles.line}>
        <Text style={styles.text}>Remove all records</Text>
        <Pressable style={styles.button} onPress={removeRecordsAlert}>
          <Text style={styles.text}>Remove</Text>
        </Pressable>
      </View>
    </View>
  )
}

const colorScheme = Appearance.getColorScheme()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColor.backgroundColor[colorScheme],
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    color: ThemeColor.textColor[colorScheme],
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingLeft: 10,
  },
  text: {
    color: ThemeColor.textColor[colorScheme],
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
    color: ThemeColor.textColor[colorScheme],
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
})
