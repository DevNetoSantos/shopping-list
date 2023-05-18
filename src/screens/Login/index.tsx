import { View, Text, Button, Image, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../ContextApi/authProvider';
import styles from './styles';


export default function Login({ navigation }: any) {
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      navigation.navigate('Home');
    }
  }, [user, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.contentLogo}>
        <Image
          style={styles.imageLogo}
          source={require('../../../assets/icon.png')}
        />
      </View>
      <View style={styles.containerButton}>
        <Button color={"red"} title='Login com google' onPress={() => login()} />
      </View>
    </View>
  )
}
