import React, { useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { useAuth } from '../../ContextApi/authProvider';

const Home = ({navigation}: any) => {
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user === null) {
      navigation.navigate('Login');
    }
  }, [user, navigation]);

  return (
    <View>
      <Text>Home</Text>
      <Text>Olá, {user?.name}</Text>
      <Button title='Logout' onPress={() => logout()}/>
    </View>
  )
}

export default Home