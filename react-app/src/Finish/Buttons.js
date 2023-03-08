import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import ArrowRotateLeft from '../../assets/icons/arrow-rotate-left.svg'
import Home from '../../assets/icons/home.svg'
import Train from '../../assets/icons/train.svg'

export default function Buttons() {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, styles.blueButton]}
        onPress={() => {
          navigation.navigate('In Seat/ Stretching')
        }}
      >
        <View style={styles.icon}>
          <ArrowRotateLeft height={20} width={20} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>ONCE MORE</Text>
        </View>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate('Home')
        }}
      >
        <View style={styles.icon}>
          <Home height={20} width={20} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>FINISH</Text>
        </View>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          Alert.alert('Coming soon!')
        }}
      >
        <View style={styles.icon}>
          <Train height={20} width={20} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>START JOURNEY</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: 270,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#ffb300',
    borderRadius: 5,
  },
  blueButton: {
    backgroundColor: '#64B5F6',
  },
  icon: {
    alignItems: 'center',
    marginLeft: 30,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
  },
})
