import { StyleSheet, View, FlatList, Appearance, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { DUMMY_FUNCTION_DATA } from '../../data/DummyFunctionData'
import NavBar from '../NavBar.js'
import SideMenu from '../SideMenu'
import Card from './Card'
import ThemeColor from '../Utilities/ThemeColor'

export default function Home() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <View style={styles.upperWrapper}>
      <SafeAreaView />
      <SafeAreaView style={styles.lowerWrapper}>
        <NavBar setShowMenu={setShowMenu} />
        {showMenu && <SideMenu setShowMenu={setShowMenu} />}
        <View style={styles.flatListContainer}>
          <FlatList
            data={DUMMY_FUNCTION_DATA}
            keyExtractor={(item) => item.id.toString()}
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
            style={{ marginBottom: 52 }}
          />
        </View>
      </SafeAreaView>
    </View>
  )
}

const colorScheme = Appearance.getColorScheme()

const styles = StyleSheet.create({
  upperWrapper: {
    flex: 1,
    backgroundColor: ThemeColor.componentColor[colorScheme],
    paddingTop: 35,
  },
  lowerWrapper: {
    backgroundColor: ThemeColor.backgroundColor[colorScheme],
    flex: 1,
  },
  flatListContainer: {
    padding: 20,
    marginBottom: 50,
  },
})
