import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, FlatList, Text, Pressable } from 'react-native'
import NavBar from './NavBar.js'
import React from 'react'
import { DUMMY_DATA } from '../data/DummyData'
import { SvgXml } from 'react-native-svg'

// Component of the card
function Card({ title, description, image, available, type }) {
  return (
    <View style={styles.cardContainer}>
      <ImageInCard image={image} type={type} style={styles.imageContainer} />
      <View>
        <TextInCard title={title} description={description} available={available} />
        <Press></Press>
      </View>
    </View>
  )
}

// Component of the image in the card
function ImageInCard({ image, type }) {
  return (
    <View
      style={[
        styles.imageContainer,
        type == 'standalone' ? styles.standaloneCardImage : styles.journeyCardImage
      ]}
    >
      <View style={styles.svgContainer}>
        <SvgXml width='100%' height='100%' xml={image} />
      </View>
    </View>
  )
}

// Component of the text in the card
function TextInCard({ title, description, available }) {
  return (
    <View style={styles.textContainer}>
      {!available && <Text style={styles.status}>coming soon</Text>}
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

// Component of the button in the card
function Press() {
  return <Pressable></Pressable>
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
  standaloneCardImage: {
    backgroundColor: '#FFCA28'
  },
  journeyCardImage: {
    backgroundColor: '#64B5F6'
  },
  textContainer: {
    backgroundColor: '#cfd8dc',
    padding: 17
  },
  textTitle: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 6
  },
  status: {
    lineHeight: 16
  },
  unavailable: {
    color: '#878d8f'
  }
})
