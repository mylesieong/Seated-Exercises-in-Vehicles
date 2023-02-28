import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Alert,
} from 'react-native'
import React from 'react'

export default function NavBar() {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => Alert.alert('This is a recall function.')}
        style={styles.button}
      >
        <View style={styles.bar}></View>
        <View style={styles.bar}></View>
        <View style={styles.bar}></View>
      </Pressable>

      <Text style={styles.text}>Home</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 52,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    backgroundColor: '#263238',
  },
  button: {
    height: 24,
    width: 24,
    margin: 14,
    paddingHorizontal: 3,
    paddingVertical: 6,
    justifyContent: 'space-between',
  },
  text: {
    color: '#FFFFFF',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 20,
  },
  bar: {
    backgroundColor: '#FFFFFF',
    height: 2,
    width: 18,
  },
})
