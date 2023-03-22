import { StyleSheet, View, FlatList, Text } from 'react-native'
import React, { useState } from 'react'
import { DUMMY_FUNCTION_DATA } from '../../data/DummyFunctionData'
import NavBar from '../NavBar.js'
import SideMenu from '../SideMenu'
import Card from './Card'
import PageTemplate from '../Utilities/PageTemplate'
import ThemeColor from '../Utilities/ThemeColor'

export default function Home() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <PageTemplate>
      <NavBar setShowMenu={setShowMenu} />
      {showMenu && <SideMenu setShowMenu={setShowMenu} />}
      <View style={styles.greeting}>
        <Text style={styles.greetingText}>Good Morning</Text>
      </View>
      <Text style={styles.title}>Challenge</Text>
      <View style={styles.flatListContainer}>
        <FlatList
          data={DUMMY_FUNCTION_DATA}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              description={item.description}
              image={item.image}
              available={item.available}
              type={item.type}
              screen={item.screen}
            />
          )}
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
    backgroundColor: ThemeColor.primaryDarker,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 25,
    paddingTop: 20,
    color: ThemeColor.text,
  },
  greetingText: {
    color: ThemeColor.textWhite,
    fontSize: 25,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
})
