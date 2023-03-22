import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import ThemeColor from '../Utilities/ThemeColor'

export default function StartExerciseButton() {
  const navigation = useNavigation()
  return (
    <Pressable onPress={() => navigation.navigate('Exercise Steps')} style={styles.button}>
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
    backgroundColor: '#ffb300',
  },
  text: {
    fontFamily: 'NotoSansExtraBold',
    fontSize: 20,
    lineHeight: 24,
    color: ThemeColor.titleTextColor,
    transform: [{ scaleX: 0.75 }],
  },
})
