import { StyleSheet, Text, View, Pressable, Dimensions, Platform } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function StartExerciseButton() {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate('Exercise Steps')}
        style={[styles.button, styles.shadow]}
      >
        <Text style={styles.text}>Start</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    alignItems: 'center',
    bottom: 60,
  },
  button: {
    width: 180,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffb300',
  },
  ...Platform.select({
    ios: {
      shadow: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2.0,
      },
    },
    android: {
      shadow: {
        shadowColor: '#000000',
        elevation: 5,
      },
    },
  }),

  text: {
    fontWeight: 500,
    fontSize: 18,
  },
})
