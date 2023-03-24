import { StyleSheet, View, FlatList, Dimensions, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { EXERCISES_INFO } from '../../data/ExercisesInfo'
import Card from './Card'
import Greeting from './Greeting'
import PageTemplate from '../Utilities/PageTemplate'
import ThemeColor from '../Utilities/ThemeColor'
import Calendar from '../../assets/icons/calendar.svg'

export default function Home() {
  const navigation = useNavigation()

  return (
    <PageTemplate bottomColor={ThemeColor.deepBackground} removeIphoneXFooter={true}>
      <View style={styles.topBox}>
        <View style={styles.calendarIcon}>
          <Pressable onPress={() => navigation.navigate('History')}>
            <Calendar width={30} height={30} />
          </Pressable>
        </View>
        <Greeting />
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          data={EXERCISES_INFO}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingTop: 67, paddingBottom: 200 }}
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
    position: 'absolute',
    top: 41,
    width: Dimensions.get('window').width,
  },
  topBox: {
    backgroundColor: ThemeColor.primaryDarker,
    height: 190,
  },
  calendarIcon: {
    paddingTop: 13,
    paddingRight: 18,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})
