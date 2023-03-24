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
          {() => <Mine db={db} reset={reset} setReset={setReset} />}
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
        <Stack.Screen name='History'>{() => <History db={db} reset={reset} />}</Stack.Screen>
        <Stack.Screen name='ExerciseOverview' component={ExerciseOverview} />
        <Stack.Screen name='Exercise Steps' component={ExerciseSteps} />
        <Stack.Screen name='Finish'>{() => <Finish db={db} />}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
