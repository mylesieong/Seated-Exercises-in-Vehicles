/* eslint-disable react/no-unescaped-entities */
import { StyleSheet, Text, ScrollView } from 'react-native'
import React from 'react'
import PageTemplate from '../Utilities/PageTemplate'
import Header from '../Utilities/Header'
import ThemeColor from '../Utilities/ThemeColor'

export default function About() {
  return (
    <PageTemplate
      topBarColor={ThemeColor.background}
      bottomColor={ThemeColor.tab}
      removeIphoneXFooter={true}
    >
      <Header height={66} backgroundColor={ThemeColor.background} buttonColor={ThemeColor.text}>
        <Text style={styles.title}>About Us</Text>
      </Header>
      <ScrollView style={styles.container}>
        <Text style={styles.text}>
          SeatFit is an innovative fitness app designed to help individuals achieve their fitness
          goals with ease. Our team is made up of experienced fitness professionals and software
          developers who have collaborated to create a unique platform that combines advanced
          fitness technology with expert guidance and support.
        </Text>
        <Text style={styles.text}>
          We understand that everyone's fitness journey is unique, which is why we have developed a
          range of customizable workout plans to suit every individual's needs. Our app offers
          various options to cater to those who are just starting out on their fitness journey or
          looking to take their workouts to the next level.
        </Text>
        <Text style={styles.text}>
          At SeatFit, we are passionate about helping people reach their full potential, and we
          believe that fitness should be accessible to everyone. To that end, we have made our app
          user-friendly and affordable so that anyone can access our innovative platform's benefits.
          We also offer personalized coaching to our users to help them stay motivated and on track
          towards achieving their fitness goals.
        </Text>
        <Text style={styles.text}>
          In conclusion, SeatFit is a comprehensive fitness app that offers users access to expert
          guidance, customized workout plans, and a supportive community to help them achieve their
          fitness goals. Our team is committed to helping people live healthier, happier lives by
          providing them with the tools and resources they need to succeed.
        </Text>
      </ScrollView>
    </PageTemplate>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ThemeColor.tab,
    padding: 20,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    color: ThemeColor.text,
    marginTop: 12,
    fontFamily: 'NotoSansExtraBold',
  },
  text: {
    color: ThemeColor.text,
    fontFamily: 'NotoSansMid',
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 20,
  },
})
