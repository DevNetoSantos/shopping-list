import { View, Text, Button } from 'react-native'
import React from 'react'

export default function Login({navigation}: any) {
  return (
    <View>
      <Text>Login</Text>
      <Button title='Fazer Login' onPress={() => navigation.navigate('Home')}/>
    </View>
  )
}