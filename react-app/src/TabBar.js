import { StyleSheet, Text, View, Pressable, SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import ThemeColor from './Utilities/ThemeColor'
import TabHome from '../assets/icons/tab-home.svg'
import TabMine from '../assets/icons/tab-mine.svg'

export default function TabBar({ state }) {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={{ backgroundColor: ThemeColor.tab }}>
      <View style={styles.container}>
        {state.routeNames.map((tab, index) => {
          return (
            <Pressable key={index} style={styles.button} onPress={() => navigation.navigate(tab)}>
              {index == 0 ? (
                <TabHome
                  width={24}
                  height={24}
                  color={state['index'] == index ? ThemeColor.primaryDarker : ThemeColor.textBlack}
                />
              ) : index == 1 ? (
                <TabMine
                  width={24}
                  height={24}
                  color={state['index'] == index ? ThemeColor.primaryDarker : ThemeColor.textBlack}
                />
              ) : null}
              <Text
                style={[
                  styles.text,
                  state['index'] == index && { color: ThemeColor.primaryDarker },
                ]}
              >
                {state.routeNames[index]}
              </Text>
            </Pressable>
          )
        })}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 55,
    backgroundColor: ThemeColor.tab,
    paddingTop: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'NotoSansBasic',
    fontSize: 13,
    lineHeight: 20,
    color: ThemeColor.textBlack,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
})
