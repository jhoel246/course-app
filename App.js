import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default App = () => {
  const [selectImage, setSelectImage] = useState(null);

  //con esta consulta se lleva a cabo una ejecucion de permisos para las imagenes, si los permite se ejecuta el comando y lo lleva a la galeria de usuario
  let openImagesPickerAsync = async () => {
    //pide permisos al usuario para la lectura de las imagenes
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("premission to access camera is required");
      return;
    }
    //Cuando el usuario mire la galeria por este medio retorna la imagen
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);

    if (pickerResult.canceled === true) {
      return;
    }

    setSelectImage({ localUri: pickerResult.uri });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hola elige una imagen</Text>
      <Image
        style={styles.images}
        source={{
          uri:
            selectImage !== null
            ? selectImage
              : "https://picsum.photos/200/300",
        }}
      />
      <TouchableOpacity onPress={openImagesPickerAsync} style={styles.button}>
        <Text>Precione</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "yellowgreen",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    margin: 10,
  },
  images: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  button: {
    margin: 10,
    borderRadius: 100,
    backgroundColor: "green",
    padding: 10,
    color: "white",
  },
});
