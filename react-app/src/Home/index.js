import { StyleSheet, View, FlatList, Text } from 'react-native'
import React, { useState } from 'react'
import { DUMMY_FUNCTION_DATA } from '../../data/DummyFunctionData'
import NavBar from '../NavBar.js'
import SideMenu from '../SideMenu'
import Card from './Card'
import Greeting from './Greeting'
import PageTemplate from '../Utilities/PageTemplate'
import ThemeColor from '../Utilities/ThemeColor'

export default function Home() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <PageTemplate topBarColor={showMenu ? null : '#FFB300'}>
      <NavBar setShowMenu={setShowMenu} navbarColor='#FFB300' />
      {showMenu && <SideMenu setShowMenu={setShowMenu} />}
      <View style={styles.greeting}>
        <Greeting />
      </View>
      <Text style={styles.title}>Challenge</Text>
      <View style={styles.flatListContainer}>
        <FlatList
          data={DUMMY_FUNCTION_DATA}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => <Card item={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </PageTemplate>
  )
}

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  greeting: {
    height: 100,
    backgroundColor: '#FFB300',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 25,
    paddingTop: 20,
    color: ThemeColor.textColor,
  },
})
