import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
} from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SideMenu from './SideMenu';

export default function NavBar({ }) {
  const route = useRoute();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setShowMenu(true)}
        style={styles.button}
      >
        <FontAwesome name='bars' style={styles.icon} />
      </Pressable>
      <Text style={styles.text}>{route.name}</Text>
      {showMenu && <SideMenu />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 52,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    backgroundColor: '#D0D7DD'
  },
  button: {
    height: 24,
    width: 24,
    margin: 14,
    paddingHorizontal: 3,
    paddingVertical: 6,
    justifyContent: 'space-between'
  },
  text: {
    color: 'black',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 20
  },
  icon: {
    color: 'black'
  }
})
