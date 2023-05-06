import { View, Text, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const ShoppingItem = (props: any) => {
  const { item } = props;

  return (
    <View style={styles.container}>
      {/* checked icon */}
      <Pressable>
        <AntDesign name="checkcircleo" size={30} color="black" />
      </Pressable>
      {/* shopping text */}
      <Text style={styles.textItems}>{item.listItem.item}</Text>
      {/* button delete items */}
      <Pressable>
        <MaterialIcons name="delete" size={30} color="black" />
      </Pressable>
    </View>
  )
}

export default ShoppingItem;