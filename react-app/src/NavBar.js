import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Dimensions,
  Alert,
} from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function NavBar() {
  const route = useRoute();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => Alert.alert('This is a recall function.')}
        style={styles.button}
      >
        <FontAwesome name='bars' style={styles.icon} />
      </Pressable>

      <Text style={styles.text}>{route.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 52,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    backgroundColor: '#D0D7DD',
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
    color: 'black',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 20,
  },
  icon: {
    color: 'black',
  },
})
