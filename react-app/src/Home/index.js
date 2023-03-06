import { StyleSheet, View, FlatList } from 'react-native'
import React, { useState } from 'react'
import { DUMMY_FUNCTION_DATA } from '../../data/DummyFunctionData'
import NavBar from '../NavBar.js'
import SideMenu from '../SideMenu'
import Card from './Card'

export default function Home() {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <View style={styles.container}>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatListContainer: {
    padding: 20,
    marginBottom: 50,
  },
})
