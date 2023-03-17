import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { TabRouter, useNavigation, useRoute } from '@react-navigation/native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ThemeColor from './Utilities/ThemeColor'
import Calendar from '../assets/icons/calendar.svg'

export default function NavBar({ setShowMenu }) {
  const navigation = useNavigation()
  const route = useRoute()

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: route.name === 'Home' ? '#FFB300' : ThemeColor.componentColor,
          justifyContent: route.name === 'Home' ? 'space-between' : 'flex-start',
        },
      ]}
    >
      <Pressable onPress={() => setShowMenu(true)}>
        <FontAwesome name='bars' style={styles.icon} />
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
  },
  text: {
    color: ThemeColor.textColor,
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 25,
    marginLeft: 30,
    paddingVertical: 12,
  },
  icon: {
    color: ThemeColor.textColor,
    fontSize: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  placeholder: {
    width: 30,
    height: 30,
  },
})
