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

  const db = SQLite.openDatabase('Record')
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
          `create table if not exists Record (id integer primary key not null AUTOINCREMENT, timestamp integer not null, exercise_name text not null);`,
          [],
          () => {
            setDebugMessage('create table success')
          },
          () => {
            setDebugMessage('create table failed')
            return false
          }
        )

        // insert data into database
        // tx.executeSql(
        //   `insert into Record (timestamp, exercise_name) values (?,?);`,
        //   [20280225, 'stretchW'],
        //   () => {
        //     setDebugMessage('insert success')
        //   },
        //   (tx, error) => {
        //     setDebugMessage('insert failed' + error)
        //     return false
        //   }
        // )

        // select data from database
        tx.executeSql(
          `select * from Record;`,
          [],
          (_, { rows }) => {
            setDebugMessage(rows._array)
          },
          (tx, error) => {
            setDebugMessage('select failed' + error)
            return false
          }
        )
      },

      (error) => {
        setDebugMessage('tx failed' + error)
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
