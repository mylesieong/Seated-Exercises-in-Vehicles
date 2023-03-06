import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/Home'
import Setting from './src/Setting'
import History from './src/History'
import ExerciseOverview from './src/ExerciseOverview'
import ExerciseSteps from './src/ExerciseSteps'
import { useEffect, useState } from 'react'

const Stack = createNativeStackNavigator()
import * as SQLite from 'expo-sqlite'

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

  const db = SQLite.openDatabase('db.db')
  return db
}

const db = openDatabase()

export default function App() {
  const [debugMessage, setDebugMessage] = useState('debug2')

  useEffect(() => {
    db.transaction(
      (tx) => {
        // setDebugMessage('in tx2')

        tx.executeSql(
          `create table if not exists sample_table (id integer primary key not null, name text);`,
          [],
          () => {
            setDebugMessage('create table success')
          },
          () => {
            setDebugMessage('create table faile')
            return false
          }
        )

        tx.executeSql(
          `insert into sample_table (name) values (?);`,
          ['foobar'],
          () => {
            setDebugMessage('insert success')
          },
          (tx, error) => {
            setDebugMessage('insert faile' + error)
            return false
          }
        )

        tx.executeSql(
          `select * from sample_table;`,
          [],
          (_, { rows }) => {
            setDebugMessage('select result:' + JSON.stringify(rows._array))
          },
          (tx, error) => {
            setDebugMessage('select faile' + error)
            return false
          }
        )
      },
      (error) => {
        // setDebugMessage('tx failed')
      },
      () => {
        // setDebugMessage('tx success')
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
        <Stack.Screen name='Setting' component={Setting} />
        <Stack.Screen name='History' component={History} />
        <Stack.Screen name='In Seat/ Stretching' component={ExerciseOverview} />
        <Stack.Screen name='Exercise Steps' component={ExerciseSteps} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
