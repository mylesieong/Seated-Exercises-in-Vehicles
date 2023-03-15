import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ThemeColor from './Utilities/ThemeColor'

export default function NavBar({ setShowMenu }) {
  const route = useRoute()

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setShowMenu(true)}>
        <FontAwesome name='bars' style={styles.icon} />
      </Pressable>
      <Text style={styles.text}>{route.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    backgroundColor: ThemeColor.componentColor,
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
  },
})
