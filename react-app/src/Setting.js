import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import NavBar from './NavBar.js'
import SideMenu from './SideMenu.js'

export default function Setting({}) {
  const [showMenu, setShowMenu] = useState(false)
  const handlePress = () => {
    setShowMenu(false)
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <NavBar setShowMenu={setShowMenu} />
        {showMenu && <SideMenu setShowMenu={setShowMenu} />}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
})
