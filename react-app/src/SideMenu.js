import { useNavigation } from '@react-navigation/native'
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  Appearance,
} from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MainIcon from '../assets/icons/frame-16.svg'
import ThemeColor from './Utilities/ThemeColor'

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
      <View style={styles.container}>
        <View style={styles.content}>
          <MainIcon width='150' height='150' />
          <Pressable style={styles.page} onPress={() => handlePress('Home')}>
            <FontAwesome name='home' style={styles.icon} />
            <Text style={styles.text}>Home</Text>
          </Pressable>
          <Pressable style={styles.page} onPress={() => handlePress('History')}>
            <FontAwesome name='history' style={styles.icon} />
            <Text style={styles.text}>History</Text>
          </Pressable>
          <Pressable style={styles.page} onPress={() => handlePress('Setting')}>
            <FontAwesome name='cog' style={styles.icon} />
            <Text style={styles.text}>Setting</Text>
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const colorScheme = Appearance.getColorScheme()

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    position: 'absolute',
    left: 0,
    zIndex: 10,
    backgroundColor: ThemeColor.componentColor[colorScheme],
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.58,
    shadowRadius: 10,

    elevation: 24,
    paddingHorizontal: 20,
  },
  page: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  icon: {
    paddingHorizontal: 20,
    fontSize: 20,
    color: ThemeColor.textColor[colorScheme],
  },
  text: {
    fontSize: 20,
    color: ThemeColor.textColor[colorScheme],
  },
})
