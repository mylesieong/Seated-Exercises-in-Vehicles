import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/Home'
import Setting from './src/Setting'
import History from './src/History'
import ExerciseOverview from './src/ExerciseOverview'
import ExerciseSteps from './src/ExerciseSteps'
import { Platform } from 'react-native'
import Finish from './src/Finish'
import * as SQLite from 'expo-sqlite'

const Stack = createNativeStackNavigator()

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

  const [reset, resetTrigger] = useState(false)

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Setting'>
          {() => (
            <Setting
              db={db}
              resetTrigger={() => {
                resetTrigger(!reset)
              }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name='History'>{() => <History db={db} reset={reset} />}</Stack.Screen>
        <Stack.Screen name='In Seat/ Stretching' component={ExerciseOverview} />
        <Stack.Screen name='Exercise Steps'>{() => <ExerciseSteps db={db} />}</Stack.Screen>
        <Stack.Screen name='Finish' component={Finish} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
