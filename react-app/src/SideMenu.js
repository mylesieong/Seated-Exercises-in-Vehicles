import { useNavigation } from '@react-navigation/native'
import { StyleSheet, View, Pressable, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function SideMenu({ setShowMenu }) {
  const navigation = useNavigation()
  const handlePress = (screen) => {
    navigation.navigate(screen)
    setShowMenu(false)
  }
  const handleScreenPress = () => {
    setShowMenu(false)
  }

  return (
    <TouchableWithoutFeedback onPress={handleScreenPress}>
      <View style={styles.container} onPress={handleScreenPress}>
        <Pressable style={styles.page} onPress={() => handlePress('Home')}>
          <FontAwesome name='home' style={styles.icon} />
          <Text style={styles.text}>Home</Text>
        </Pressable>
        <Pressable style={styles.page} onPress={() => handlePress('Setting')}>
          <FontAwesome name='cog' style={styles.icon} />
          <Text style={styles.text}>Setting</Text>
        </Pressable>
        <Pressable style={styles.page} onPress={() => handlePress('History')}>
          <FontAwesome name='history' style={styles.icon} />
          <Text style={styles.text}>History</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    zIndex: 10,
    backgroundColor: '#D0D7DD',
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    paddingHorizontal: 20
  },
  page: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    color: 'black'
  },
  icon: {
    paddingHorizontal: 20,
    fontSize: 20
  },
  text: {
    fontSize: 20
  }
})
