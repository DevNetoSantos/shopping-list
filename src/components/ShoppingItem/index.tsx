import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import  {doc, updateDoc, db} from '../../config/Firebase/index'


const ShoppingItem = (props: any) => {
  const { item } = props
  const [isChecked,setIsChecked] = useState(item.isChecked);

  const updateIsCheked = async () => {
    const shoppingRef = doc(db, "shopping", item.id);

    await updateDoc(shoppingRef, {
        isChecked: isChecked
    });
  }

  useEffect(() => {
    updateIsCheked();
  }, [isChecked])

  return (
    <View style={styles.container}>
      {/* checked icon */}
      <Pressable onPress={() => setIsChecked(!isChecked)}>
        {
          isChecked ? <AntDesign name="checkcircle" size={24} color="black" /> :
          <AntDesign name="checkcircleo" size={30} color="black" />
        }
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