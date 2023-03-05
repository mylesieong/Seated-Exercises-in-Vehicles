import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { Calendar } from 'react-native-calendars'
import React from 'react'
import NavBar from './NavBar.js'
import SideMenu from './SideMenu.js'
import * as SQLite from 'expo-sqlite'

const [name, setName] = useState()

const db = SQLite.openDatabase('sample_table')
createTable() // 「sample_table」というテーブル作成
insert(1, 'Taro') // 「id=1, name=Taro」のデータを登録
insert(2, 'Jiro') // 「id=2, name=Jiro」のデータを登録
select() // データを取得してログに表示

function createTable() {
  db.transaction((tx) => {
    tx.executeSql(
      // 実行したいSQL文
      `create table if not exists sample_table (id integer primary key not null, name text);`,
      // SQL文の引数
      // 必要ないときは空のまま
      [],
      // 成功時のコールバック関数
      () => {
        console.log('create table success')
      },
      () => {
        // 失敗時のコールバック関数
        console.log('create table faile')
        return false
      }
    )
  })
}

useEffect(() => {
  db.transaction((txn) => {
    txn.executeSql(
      `select * from sample_table;`,
      [],
      (_, { rows }) => {
        console.log('select result:' + JSON.stringify(rows._array))
        setName(name)
      },
      (error) => {
        console.log(error)
      }
    )
  })
}, [])

function select() {
  db.transaction((tx) => {
    tx.executeSql(
      // 実行したいSQL文
      `select * from sample_table;`,
      // SQL文の引数
      [],
      // 成功時のコールバック関数
      (_, { rows }) => {
        console.log('select success')
        console.log('select result:' + JSON.stringify(rows._array))
      },
      () => {
        // 失敗時のコールバック関数
        console.log('select faile')
        return false
      }
    )
  })
}

function insert(id, name) {
  db.transaction((tx) => {
    tx.executeSql(
      // 実行したいSQL文
      // ?のところに引数で設定した値が順番に入る
      `insert into sample_table values (?, ?);`,
      // SQL文の引数
      [id, name],
      // 成功時のコールバック関数
      () => {
        console.log('insert success')
        setName(name)
      },
      () => {
        // 失敗時のコールバック関数
        console.log('insert faile')
        return false
      }
    )
  })
}

export default function History() {
  const [showMenu, setShowMenu] = useState(false)

  // marked the days
  const marked = {
    '2023-02-18': { selected: true },
    '2023-02-19': { selected: true },
    '2023-02-23': { selected: true },
    '2023-03-12': { selected: true },
    '2023-03-14': { selected: true }
  }

  return (
    <View style={styles.container}>
      <NavBar setShowMenu={setShowMenu} />
      {showMenu && <SideMenu setShowMenu={setShowMenu} />}
      <View style={styles.calendar}>
        {/* Calendar */}
        <Calendar markedDates={marked} />
        {/* Text of the record */}
        <Text style={styles.title}>Records</Text>
        <View style={styles.recordInfo}>
          <Text style={styles.recordDate}>2023年2月23日</Text>
          <Text style={styles.recordText}>Standard stretching</Text>
        </View>
      </View>
      <TextInput placeholder='Enter User Name' value={name} />
    </View>
  )
}

// Css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch'
  },
  calendar: {
    marginTop: 90,
    ...StyleSheet.absoluteFillObject,
    padding: 10
  },
  title: {
    margin: 15,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e'
  },
  recordInfo: {
    justifyContent: 'center',
    flexDirection: 'row'
  },
  recordDate: {
    margin: 9,
    paddingRight: 18,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#34495e'
  },
  recordText: {
    margin: 9,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#34495e'
  }
})
