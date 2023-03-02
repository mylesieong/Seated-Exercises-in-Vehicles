import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import NavBar from './NavBar.js'
import { useState } from 'react'
import SideMenu from './SideMenu.js'

export default function Home({}) {
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
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})
