import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import ThemeColor from '../Utilities/ThemeColor'

export default function StartExerciseButton({ id, title }) {
  const navigation = useNavigation()
  return (
    <Pressable
      onPress={() => navigation.navigate('Exercise Steps', { id: id, title: title })}
      style={styles.button}
    >
      <Text style={styles.text}>Start</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ThemeColor.primaryDarker,
  },
  text: {
    fontFamily: 'NotoSansExtraBold',
    fontSize: 20,
    lineHeight: 24,
    color: ThemeColor.textWhite,
    transform: [{ scaleX: 0.75 }],
  },
})
