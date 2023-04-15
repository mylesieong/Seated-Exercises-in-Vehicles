import { Alert } from 'react-native'
import React from 'react'
import Icon from '../../../assets/icons/reset-icon.svg'
import ThemeColor from '../../Utilities/ThemeColor.js'
import Button from './Button'

export default function ResetButton({ db, reset, setReset }) {
  const removeRecordsAlert = () => {
    Alert.alert('Remove all records', 'Once you delete all records, it cannot be undone', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'OK', onPress: () => clearRecords() },
    ])
  }
  const clearRecords = () => {
    db.transaction((tx) => {
      tx.executeSql(`DELETE FROM Record;`), [], setReset(!reset)
    })
  }

  return (
    <Button onPress={removeRecordsAlert} text={`Reset`}>
      <Icon height={24} width={24} color={ThemeColor.text} />
    </Button>
  )
}
