import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../ContextApi/authProvider';


export default function Login({ navigation }: any) {
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      navigation.navigate('Home');
    }
  }, [user, navigation]);


  return (
    <View>
      <Text>Login</Text>
      <Button title='Fazer Login' onPress={() => login()} />
    </View>
  )
}
