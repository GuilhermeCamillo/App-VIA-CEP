import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [cep, setCEP] = useState<{
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
  }>();

  const getCEP = (cep: string) => {
    try {
      axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res) => {
        const data = res.data;
        setCEP(data);
      });
      setError(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
        style={styles.input}
        placeholder="Digite seu CEP"
        onChangeText={(text) => setText(text)}
      />
      {error && (
        <Text style={{ color: "red" }}>ERRO, NECESSARIO 8 DIGITOS</Text>
      )}
      <Button
        title="Buscar CEP"
        onPress={() => {
          text.length == 8 ? getCEP(text) : setError(true);
        }}
      />
      <View style={styles.boxcep}>
        <Text>{cep?.cep}</Text>
        <Text>{cep?.logradouro}</Text>
        <Text>{cep?.bairro}</Text>
        <Text>{cep?.localidade}</Text>
        <Text>{cep?.uf}</Text>
        <Text>{cep?.ibge}</Text>
        <Text>{cep?.ddd}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 40,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
  },
  boxcep: {
    marginTop: 40,
    backgroundColor: "#c2c1c1",
    padding: 16,
    borderRadius: 6,
  },
});
