import React, { useEffect } from 'react'
import { View, Text, Button, SafeAreaView, Pressable, TextInput } from 'react-native'
import { useAuth } from '../../ContextApi/authProvider';
import ShoppingItem from '../../components/ShoppingItem';
import { MaterialIcons } from '@expo/vector-icons';
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
      <View style={styles.header}>
        {/* Text Title */}
        <Text style={styles.titleText}>Lista de Compras</Text>
        {/* numberItems */}
        <Text style={styles.numberItems}>3</Text>
        {/* delete items */}
        <Pressable>
          <MaterialIcons name="delete" size={30} color="black" />
        </Pressable>
      </View>
      <ShoppingItem />
      <ShoppingItem />
      <ShoppingItem />

      <TextInput 
        style={styles.textInput}
        placeholder='Adicionar item'
      />
    </SafeAreaView>
  )
}

export default Home