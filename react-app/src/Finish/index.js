import { StyleSheet, Dimensions, BackHandler } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Header from './Header'
import Image from './Image'
import Buttons from './Buttons'
import Info from './Info'
import Lottie from 'lottie-react-native'
import { useEffect } from 'react'
import PageTemplate from '../Utilities/PageTemplate'

import { STRETCHING_EXERCISE_DATA } from '../../data/StretchingExerciseData'
import ThemeColor from '../Utilities/ThemeColor'

export default function Finish({ db }) {
  const navigation = useNavigation()
  const route = useRoute()

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql('insert into Record (exercise_name, timestamp) values (?, ?)', [
        route.params.exerciseName,
        new Date().getTime(),
      ])
    })
    const backAction = () => {
      navigation.navigate('In Seat/ Stretching')
      return true
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)
    return () => backHandler.remove()
  }, [])

  return (
    <PageTemplate topBarColor={ThemeColor.background} bottomColor={ThemeColor.background}>
      <Header />
      <Info moves={STRETCHING_EXERCISE_DATA.length} time={`10`} format={`Sitting`}></Info>
      <Image />
      <Lottie
        source={require('../../assets/animation/62717-confetti.json')}
        autoPlay
        loop
        style={styles.animation}
        resizeMode='cover'
      />
      <Buttons />
    </PageTemplate>
  )
}

const styles = StyleSheet.create({
  animation: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    flex: 1,
    top: 0,
  },
})
