import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/Home'
import Setting from './src/Setting'
import History from './src/History'
import ExerciseOverview from './src/ExerciseOverview'
import ExerciseSteps from './src/ExerciseSteps'

const Stack = createNativeStackNavigator()

export default function App() {
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
