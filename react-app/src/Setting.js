import { StyleSheet, View, Text, Appearance } from 'react-native'
import React, { useState } from 'react'
import NavBar from './NavBar.js'
import SideMenu from './SideMenu.js'
import ThemeColor from './Utilities/ThemeColor.js'

export default function Setting() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <View style={styles.container}>
      <NavBar setShowMenu={setShowMenu} />
      {showMenu && <SideMenu setShowMenu={setShowMenu} />}
      <Text>Coming soon ... </Text>
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
})
