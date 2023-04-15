import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Button from './Button'
import Icon from '../../../assets/icons/about-us.svg'
import ThemeColor from '../../Utilities/ThemeColor.js'

export default function AboutButton() {
  const navigation = useNavigation()

  return (
    <Button onPress={() => navigation.navigate('About')} text={`About Us`}>
      <Icon height={24} width={24} color={ThemeColor.text} />
    </Button>
  )
}
