import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { doc, updateDoc, db, deleteDoc } from '../../config/Firebase/index'


const ShoppingItem = (props: any) => {
  const { item, getShoppingList } = props
  const [isChecked, setIsChecked] = useState(item.listItem.isChecked);

  const updateIsCheked = async (updatedIsChecked: boolean) => {
    const userId = item.user?.id ?? '';

    if (item.user.id === userId) {
      const shoppingRef = doc(db, "shopping", item.id);

      await updateDoc(shoppingRef, {
        listItem: {
          ...item.listItem,
          isChecked: updatedIsChecked
        }
      });
    }
  };


  const deleteShoppingItem = async () => {
    const userId = item.user?.id ?? '';

    if (item.user.id === userId) {
      await deleteDoc(doc(db, "shopping", item.id));
      getShoppingList();
    }
  }

  const handleToggleChecked = async () => {
    const updatedIsChecked = !isChecked; // Inverte o valor de isChecked

    setIsChecked(updatedIsChecked); // Atualiza o estado isChecked

    await updateIsCheked(updatedIsChecked); // Chama a função updateIsCheked com o valor atualizado
  };



  useEffect(() => {
    // Verifica se o item é uma string válida antes de atualizar o estado isChecked
    if (typeof item.listItem.isChecked === 'boolean') {
      setIsChecked(item.listItem.isChecked);
    }
  }, [item.listItem.isChecked]);

  return (
    <View style={styles.container}>
      {/* checked icon */}
      <Pressable onPress={handleToggleChecked}>
        {
          isChecked ? <AntDesign name="checkcircle" size={24} color="black" /> :
            <AntDesign name="checkcircleo" size={30} color="black" />
        }
      </Pressable>
      {/* shopping text */}
      <Text style={styles.textItems}>{item.listItem.item}</Text>
      {/* button delete items */}
      <Pressable onPress={deleteShoppingItem}>
        <MaterialIcons name="delete" size={30} color="black" />
      </Pressable>
    </View>
  )
}

export default ShoppingItem;