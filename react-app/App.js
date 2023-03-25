import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './src/Home'
import History from './src/History'
import Mine from './src/Mine'
import ExerciseOverview from './src/ExerciseOverview'
import ExerciseSteps from './src/ExerciseSteps'
import { Platform } from 'react-native'
import Finish from './src/Finish'
import TabBar from './src/TabBar'
import * as SQLite from 'expo-sqlite'
import { useFonts } from 'expo-font'
import { CORE_EXERCISE_DATA } from './data/CoreExerciseData'
import { STRETCHING_EXERCISE_DATA } from './data/StretchingExerciseData'

// Database setup
function openDatabase() {
  if (Platform.OS === 'web') {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        }
      },
    }
  }

  const db = SQLite.openDatabase('shelter.db')
  return db
}
const db = openDatabase()

__DEV__ &&
  db.transaction((tx) => {
    // create a table
    tx.executeSql(`drop table if exists Record`)
  })

export default function App() {
  useEffect(() => {
    db.transaction((tx) => {
      // create a table
      tx.executeSql(
        `create table if not exists Record (_id integer primary key AUTOINCREMENT, timestamp integer not null, exercise_name text not null);`
      )
    })
  }, [])

  const [reset, setReset] = useState(false)

  // Fonts setup
  useFonts({
    NotoSans: require('./assets/fonts/NotoSans-Regular.ttf'),
    NotoSansBold: require('./assets/fonts/NotoSans-Bold.ttf'),
    NotoSansExtraBold: require('./assets/fonts/NotoSans-ExtraBold.ttf'),
  })

  // exercise data
  const exercises = { Stretching: {}, 'Core Exercise': {} }
  exercises['Stretching'].duration = Math.ceil(
    STRETCHING_EXERCISE_DATA.reduce(
      (accumulation, currentMove) => accumulation + currentMove.duration,
      0
    ) / 60
  )
  exercises['Stretching'].moves = STRETCHING_EXERCISE_DATA.length
  exercises['Core Exercise'].duration = Math.ceil(
    CORE_EXERCISE_DATA.reduce(
      (accumulation, currentMove) => accumulation + currentMove.duration,
      0
    ) / 60
  )
  exercises['Core Exercise'].moves = CORE_EXERCISE_DATA.length

  // Navigation setup
  const Stack = createNativeStackNavigator()
  const Tab = createBottomTabNavigator()

  const HomeStack = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tab.Screen name='home' component={Home} />
        <Tab.Screen name='mine'>
          {() => <Mine db={db} reset={reset} setReset={setReset} exercises={exercises} />}
        </Tab.Screen>
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Home' component={HomeStack} />
        <Stack.Screen name='History'>
          {() => <History db={db} reset={reset} setReset={setReset} exercises={exercises} />}
        </Stack.Screen>
        <Stack.Screen name='ExerciseOverview' component={ExerciseOverview} />
        <Stack.Screen name='Exercise Steps' component={ExerciseSteps} />
        <Stack.Screen name='Finish'>{() => <Finish db={db} setReset={setReset} />}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
