import { StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'
import HappyMan from '../../assets/exercises_image/happy-man.svg'


export default function Image() {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <HappyMan />
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  image: {
    height: 270,
    width: 270,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d0d7dd',
    borderRadius: 200,
  },
  animation: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    top: 0,
  },
})
