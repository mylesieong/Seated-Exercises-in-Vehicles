import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, FlatList, Text, Pressable } from 'react-native'
import NavBar from './NavBar.js'
import React from 'react'
import { DUMMY_DATA } from '../data/DummyData'
import { SvgXml } from 'react-native-svg'
import ClockIcon from '../assets/icons/clock.svg'
import ArrowIcon from '../assets/icons/arrow-right.svg'

function Card({ title, description, image, available, type }) {
  return (
    <View style={styles.cardContainer}>
      <ImageInCard image={image} type={type} style={styles.imageContainer} />
      <View style={styles.cardLowerPart}>
        <TextInCard title={title} description={description} available={available} />
        <PressButton></PressButton>
      </View>
    </View>
  )
}

function ImageInCard({ image, type }) {
  return (
    <View
      style={[
        styles.imageContainer,
        type == 'standalone' ? styles.standaloneCardColor : styles.journeyCardColor
      ]}
    >
      <View style={styles.svgContainer}>
        <SvgXml width='100%' height='100%' xml={image} />
      </View>
    </View>
  )
}

function TextInCard({ title, description, available }) {
  return (
    <View style={styles.textContainer}>
      {!available && (
        <Text style={styles.status}>
          <ClockIcon width={16} height={16} /> coming soon
        </Text>
      )}
      <Text style={[styles.textTitle, !available && styles.unavailable]}>{title}</Text>
      {description?.map((value, index) => (
        <Text key={index} style={!available && styles.unavailable}>
          {' '}
          - {value}
        </Text>
      ))}
    </View>
  )
}

function PressButton() {
  return (
    <Pressable style={styles.button}>
      <ArrowIcon height={20} width={20} />
    </Pressable>
  )
}

export default function Home() {
  return (
    <View style={styles.container}>
      <NavBar />
      <StatusBar style='auto' />
      <View style={styles.flatListContainer}>
        <FlatList
          data={DUMMY_DATA}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              description={item.description}
              image={item.image}
              available={item.available}
              type={item.type}
            />
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  flatListContainer: {
    padding: 20
  },
  cardContainer: {
    flex: 1,
    marginBottom: 20
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 110,
    padding: 17
  },
  svgContainer: {
    flex: 1,
    width: '100%'
  },
  standaloneCardColor: {
    backgroundColor: '#FFCA28'
  },
  journeyCardColor: {
    backgroundColor: '#64B5F6'
  },
  textContainer: {
    width: 250
  },
  textTitle: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 6
  },
  status: {
    lineHeight: 16,
    marginBottom: 10
  },
  unavailable: {
    color: '#878d8f'
  },
  cardLowerPart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#cfd8dc',
    padding: 17
  },
  button: {
    justifyContent: 'center',
    width: 48,
    height: 48,
    backgroundColor: '#000',
    borderRadius: '50%',
    alignItems: 'center'
  }
})
