import { StyleSheet, View, Button } from 'react-native'
import NavBar from './NavBar.js'
import { useState } from 'react'
import SideMenu from './SideMenu.js'

export default function Home({ navigation }) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <View style={styles.container}>
      <NavBar setShowMenu={setShowMenu} />
      {showMenu && <SideMenu setShowMenu={setShowMenu} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})
