import { View, Text, Pressable } from 'react-native'
import React from 'react'
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const ShoppingItem = () => {
  return (
    <View style={styles.container}>
      {/* checked icon */}
      <Pressable>
        <AntDesign name="checkcircleo" size={30} color="black" />
      </Pressable>
      {/* shopping text */}
      <Text style={styles.textItems}>Arroz</Text>
      {/* button delete items */}
      <Pressable>
        <MaterialIcons name="delete" size={30} color="black" />
      </Pressable>
    </View>
  )
}

export default ShoppingItem;