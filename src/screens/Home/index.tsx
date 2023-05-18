import React, { useEffect, useState } from 'react'
import { View, Text, Button, SafeAreaView, Pressable, TextInput, FlatList } from 'react-native'
import { useAuth } from '../../ContextApi/authProvider';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { addDoc, collection, db, getDocs, setDoc, getDoc, doc, deleteDoc } from '../../config/Firebase/index'
import ShoppingItem from '../../components/ShoppingItem';
import { Image } from 'react-native';
import { query, where } from 'firebase/firestore';

export interface ShoppingItemProps {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    photo: string;
  };
  listItem: {
    item: string;
    isChecked: boolean;
  };
}



const Home = ({ navigation }: any) => {
  const { user, logout } = useAuth();
  const [item, setItem] = useState('');
  const [shoppingList, setShoppingList] = useState<ShoppingItemProps[]>([]);

  useEffect(() => {
    if (user === null) {
      navigation.navigate('Login');
    }
  }, [user, navigation]);

  const addItem = async () => {
    try {
      const userId = user?.id ?? '';  // Obtém o ID do usuário autenticado
      const userRef = doc(db, "users", userId); // Referência ao documento do usuário

      // Verifica se o documento do usuário já existe
      const userSnapshot = await getDoc(userRef);
      if (!userSnapshot.exists()) {
        // Cria o documento do usuário se ainda não existir
        await setDoc(userRef, {
          name: user?.name,
          email: user?.email,
          photo: user?.picture
          // outros campos de dados do usuário
        });
      }

      // Cria um novo item na coleção "shopping"
      const itemRef = await addDoc(collection(db, "shopping"), {
        user: userRef,
        listItem: {
          item: item,
          isChecked: false
        }
      });

      setItem('');
      getShoppingList();
      // console.log("Document written with ID: ", itemRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };


  const getShoppingList = async () => {
    try {
      const userId = user?.id ?? ''; // Obtém o ID do usuário autenticado
      const shoppingRef = collection(db, "shopping");

      // Cria uma consulta para filtrar os documentos com base no usuário
      const querySnapshot = await getDocs(
        query(shoppingRef, where("user", "==", doc(db, "users", userId)))
      );

      const shoppingListData: any[] = [];
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
    try {
      const userId = user?.id ?? ''; // Obtém o ID do usuário autenticado
      const userRef = doc(db, "users", userId); // Referência ao documento do usuário

      const querySnapshot = await getDocs(
        query(collection(db, "shopping"), where("user", "==", userRef))
      );

      const deletePromises = querySnapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      );

      await Promise.all(deletePromises);
      getShoppingList();
    } catch (error) {
      console.log("Error deleting shopping list: ", error);
    }
  };

  useEffect(() => {
    getShoppingList();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>

        {/* imagem profile */}
        <Image
          style={styles.imageProfile}
          source={{ uri: user?.picture }}
        />
        {/* Text Title */}
        <Text style={styles.titleText}>Lista de Compras</Text>
        {/* numberItems */}
        <Text style={styles.numberItems}>{shoppingList.length}</Text>
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