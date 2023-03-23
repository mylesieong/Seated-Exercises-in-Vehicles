import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './src/Home'
import Setting from './src/Setting'
import History from './src/History'
import ExerciseOverview from './src/ExerciseOverview'
import ExerciseSteps from './src/ExerciseSteps'
import { Platform } from 'react-native'
import Finish from './src/Finish'
import TabBar from './src/TabBar'
import * as SQLite from 'expo-sqlite'
import * as Font from 'expo-font'

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
    loadFontsAsync()
  }, [])

  const [reset, resetTrigger] = useState(false)
  const [fontsLoaded, setFontsLoaded] = useState(false)

  // Fonts setup
  async function loadFontsAsync() {
    await Font.loadAsync({
      NotoSans: require('./assets/fonts/NotoSans-Regular.ttf'),
      NotoSansBold: require('./assets/fonts/NotoSans-Bold.ttf'),
      NotoSansExtraBold: require('./assets/fonts/NotoSans-ExtraBold.ttf'),
    })
    setFontsLoaded(true)
  }

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
        <Tab.Screen name='mine' component={Setting} />
      </Tab.Navigator>
    )
  }

  return fontsLoaded ? (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Home' component={HomeStack} />
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
        <Stack.Screen name='ExerciseOverview' component={ExerciseOverview} />
        <Stack.Screen name='Exercise Steps'>{() => <ExerciseSteps />}</Stack.Screen>
        <Stack.Screen name='Finish'>{() => <Finish db={db} />}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  ) : null
}
