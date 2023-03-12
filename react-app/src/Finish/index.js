import { StyleSheet, SafeAreaView, View, Dimensions, BackHandler } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Header from './Header'
import Image from './Image'
import Buttons from './Buttons'
import Lottie from 'lottie-react-native'
import { useEffect } from 'react'

export default function Finish() {
  const navigation = useNavigation()

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('In Seat/ Stretching')
      return true
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
    return () => backHandler.remove()
  }, [])

  return (
    <View style={styles.upperWrapper}>
      <SafeAreaView />
      <SafeAreaView style={styles.lowerWrapper}>
        <Header />
        <Image />
        <Lottie
          source={require('../../assets/animation/62717-confetti.json')}
          autoPlay
          loop
          style={styles.animation}
          resizeMode='cover'
        />
        <Buttons />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  upperWrapper: {
    flex: 1,
    backgroundColor: '#ffca28',
    paddingTop: 35,
  },
  lowerWrapper: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  animation: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    top: 0,
  },
})
