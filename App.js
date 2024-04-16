import React, { useState } from "react";
import { Alert, FlatList, StyleSheet, View, Text, Button, SafeAreaView, ActivityIndicator, TextInput, ScrollView } from "react-native";
import { Keyboard } from 'react-native';
import axios from "axios";

export default ApiContainer = () => {
  const [loading, setLoading] = useState(false)
  const [moeda, setMoeda] = useState(null)
  const [fromAxios, setFromAxios] = useState(false)
  const [preco, setPreco] = useState(null);

  

  const setInformacao = (json) => {
    json.forEach((element) => {
      if (element.name.toUpperCase() == moeda || element.symbol.toUpperCase() == moeda){
        setPreco(element.priceUsd);
        setFromAxios(true);
        return;
      }
    });
    
  }

  const goAPI = () => {
    setFromAxios(false);
    setLoading(true);

    axios.get(`http://10.136.63.191:3000/data`)
      .then(response => {
        setTimeout(() => {
          setLoading(false);
          setInformacao(response.data);
          Keyboard.dismiss();
        }, 2000)
      })
      .catch(error => {
        console.log(error);
      });
  }


  return (
    <SafeAreaView style={{ top: 30 }}>
      <View style={{ margin: 18 }}>
        <TextInput
          style={{ margin: 18 }}
          onChangeText={(value) => setMoeda(value.toUpperCase())}
          placeholder="Entre com a criptomoeda"
        />
        <Button
          title={'Buscar preco da moeda'}
          onPress={() => { goAPI() }}
          color='green'
        />
      </View>

      {fromAxios ?
        <View>
          <Text style={{ margin: 18 }}>Preço em dolar: {preco}</Text>
        </View>
        :
        <Text style={{ margin: 18 }}></Text>
      }
    
      {loading &&
        <View>
          <Text style={{ fontSize: 16, color: 'red', margin: 18 }}>Carregando...</Text>
          <ActivityIndicator size="large" color="red" />
        </View>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 5,
    padding: 5,
  },
});
