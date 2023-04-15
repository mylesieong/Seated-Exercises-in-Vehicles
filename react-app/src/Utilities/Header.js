import { StyleSheet, View } from 'react-native'
import React from 'react'
import GoBackButton from './GoBackButton'
import { useNavigation, useRoute } from '@react-navigation/native'
import ThemeColor from './ThemeColor'

export default function Header({
  navigation: navigationPage,
  children,
  backgroundColor,
  buttonColor,
  height,
}) {
  const navigation = useNavigation()
  const route = useRoute()
  const path = route.name

  return (
    <View
      style={[
        styles.header,
        backgroundColor
          ? { backgroundColor: backgroundColor }
          : { backgroundColor: ThemeColor.primaryDarker },
        height && { height: height },
      ]}
    >
      {path !== 'mine' && (
        <GoBackButton
          onPress={() =>
            navigationPage ? navigation.navigate(navigationPage) : navigation.goBack()
          }
          color={buttonColor ? buttonColor : ThemeColor.textColor}
        />
      )}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
})
