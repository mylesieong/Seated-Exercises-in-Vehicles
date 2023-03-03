import { StyleSheet, Text, View, Pressable, Dimensions, Platform } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function NavBar({ setShowMenu }) {
  const route = useRoute()

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setShowMenu(true)} style={styles.button}>
        <FontAwesome name='bars' style={styles.icon} />
      </Pressable>
      <Text style={styles.text}>{route.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        height: 100
      },
      android: {
        height: 80
      }
    }),
    width: Dimensions.get('window').width,
    alignItems: 'flex-end',
    backgroundColor: '#D0D7DD',
    paddingHorizontal: 20
  },
  text: {
    color: 'black',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 20,
    lineHeight: 19,
    marginLeft: 30,
    paddingVertical: 12
  },
  icon: {
    color: 'black',
    fontSize: 20,
    paddingVertical: 12
  }
})
