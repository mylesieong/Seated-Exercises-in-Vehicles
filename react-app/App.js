import React, { useEffect, useState } from 'react'
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

export default function App() {
  const [debugMessage, setDebugMessage] = useState('debug')

  useEffect(() => {
    db.transaction(
      (tx) => {
        // create a table
        tx.executeSql(
          `create table if not exists Record (_id integer primary key AUTOINCREMENT, timestamp integer not null, exercise_name text not null);`,
          [],
          () => {
            setDebugMessage('create table success')
          },
          (tx, error) => {
            setDebugMessage('create table failed' + error)
            return false
          }
        )
      },

      (error) => {
        setDebugMessage('tx failed' + error)
      }
    )
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Setting'>{(props) => <Setting {...props} db={db} />}</Stack.Screen>
        <Stack.Screen name='History'>
          {(props) => (
            <History
              {...props}
              debugMessage={debugMessage}
              db={db}
              setDebugMessage={setDebugMessage}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name='In Seat/ Stretching' component={ExerciseOverview} />
        <Stack.Screen name='Exercise Steps' component={ExerciseSteps} />
        <Stack.Screen name='Finish' component={Finish} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
