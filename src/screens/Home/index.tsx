import React, { useEffect } from 'react'
import { View, Text, Button, SafeAreaView } from 'react-native'
import { useAuth } from '../../ContextApi/authProvider';
import ShoppingItem from '../../components/ShoppingItem';
import styles from './styles';

const Home = ({navigation}: any) => {
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user === null) {
      navigation.navigate('Login');
    }
  }, [user, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ShoppingItem />
    </SafeAreaView>
  )
}

export default Home