import React, { useEffect, useState } from 'react'
import { View, Text, Button, SafeAreaView, Pressable, TextInput, FlatList } from 'react-native'
import { useAuth } from '../../ContextApi/authProvider';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { addDoc, collection, db, getDocs, doc, deleteDoc } from '../../config/Firebase/index'
import ShoppingItem from '../../components/ShoppingItem';
import { Image } from 'expo-image';

export interface ShoppingItemProps {
  id: string;
  user: string;
  email: string;
  photo: string;
  listItem: {
    item: string;
    isChecked: boolean;
  };
}

const Home = ({ navigation }: any) => {
  const { user, logout } = useAuth();
  const [item, setItem] = useState("");
  const [shoppingList, setShoppingList] = useState<ShoppingItemProps[]>([]);

  useEffect(() => {
    if (user === null) {
      navigation.navigate('Login');
    }
  }, [user, navigation]);

  const addItem = async () => {
    try {
      const docRef = await addDoc(collection(db, "shopping"), {
        user: user?.name,
        email: user?.email,
        photo: user?.picture,
        listItem: {
          item: item,
          isChecked: false
        }
      });
      setItem("");
      getShoppingList();
      //console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const getShoppingList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "shopping"));
      const shoppingListData: any = [];
      querySnapshot.forEach((doc) => {
        shoppingListData.push({
          ...doc.data(),
          id: doc.id
        });
      });
      setShoppingList(shoppingListData);
    } catch (error) {
      console.log("Error fetching shopping list data: ", error);
    }
  };

  const deleteAllShoppingList = async () => {
    const querySnapshot = await getDocs(collection(db, "shopping"));
    querySnapshot.docs.map((item) => deleteDoc(doc(db, "shopping", item.id)));
    getShoppingList();
  }

  useEffect(() => {
    getShoppingList();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Text Title */}
        <Text style={styles.titleText}>Lista de Compras</Text>
        {/* numberItems */}
        <Text style={styles.numberItems}>3</Text>
        {/* delete items */}
        <Pressable onPress={deleteAllShoppingList}>
          <MaterialIcons name="delete" size={30} color="black" />
        </Pressable>
      </View>

      <FlatList
        data={shoppingList}
        renderItem={({ item }) => (
          <ShoppingItem item={item}
            isChecked={item.listItem.isChecked}
            id={item.id}
            getShoppingList={getShoppingList}

          />)}
        keyExtractor={(item) => item.id}
      />

      <TextInput
        value={item}
        onChangeText={(text) => (setItem(text))}
        style={styles.textInput}
        onSubmitEditing={addItem}
        placeholder='Adicionar item'
      />
    </SafeAreaView>
  )
}

export default Home