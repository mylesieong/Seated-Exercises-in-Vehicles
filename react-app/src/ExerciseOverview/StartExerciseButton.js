import { StyleSheet, Text, View, Pressable, Dimensions, Platform } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import ThemeColor from '../Utilities/ThemeColor'

export default function StartExerciseButton() {
  const navigation = useNavigation()
  return (
    <View style={[styles.container, styles.shadow]}>
      <Pressable onPress={() => navigation.navigate('Exercise Steps')} style={styles.button}>
        <Text style={styles.text}>Start</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    alignItems: 'flex-start',
    backgroundColor: ThemeColor.tab,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ThemeColor.primaryDarker,
    marginTop: 8,
    marginBottom: Platform.OS === 'android' ? 8 : 0,
  },
  ...Platform.select({
    ios: {
      shadow: {
        shadowColor: ThemeColor.shadow,
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4.0,
      },
    },
    android: {
      shadow: {
        shadowColor: ThemeColor.shadow,
        elevation: 5,
      },
    },
  }),

  text: {
    fontFamily: 'NotoSansExtraBold',
    fontSize: 20,
    lineHeight: 24,
    color: ThemeColor.textWhite,
    transform: [{ scaleX: 0.75 }],
  },
})
