import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Bars from '../assets/icons/bars.svg'
import ThemeColor from './Utilities/ThemeColor'
import Calendar from '../assets/icons/calendar.svg'

export default function NavBar({ setShowMenu, navbarColor }) {
  const navigation = useNavigation()
  const route = useRoute()

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: navbarColor ? navbarColor : ThemeColor.primaryDarker,
          justifyContent: route.name === 'Home' ? 'space-between' : 'flex-start',
        },
      ]}
    >
      <Pressable onPress={() => setShowMenu(true)}>
        <Bars color={ThemeColor.textWhite} />
      </Pressable>
      {route.name === 'Home' && (
        <Pressable onPress={() => navigation.navigate('History')}>
          <Calendar width={30} height={30} />
        </Pressable>
      )}
      {route.name !== 'Home' && <Text style={styles.text}>{route.name}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  text: {
    color: ThemeColor.text,
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 25,
    marginLeft: 30,
    paddingVertical: 12,
  },
  icon: {
    color: ThemeColor.text,
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  placeholder: {
    width: 30,
    height: 30,
  },
})
