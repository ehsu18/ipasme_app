import AsyncStorage from "@react-native-async-storage/async-storage";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Button,
  Alert,
  BackHandler,
  TextInput,
  Image,
} from "react-native";
import { getInformes, postInforme } from "../tools/api";
import * as styles from "./styles";
import { dateToString } from "../tools/utils";
import { useNavigate } from "react-router-native";
import { setToken, reviewToken, setServerUrl } from "../tools/manageStorage";
import { serverURL } from "../tools/global";
import logo from '../assets/png/logo.png'
import background from '../assets/png/login-bg.png'


function LoginPage({ setLogged }) {
  let [url, setUrl] = useState("http://192.168.0.108:8000/");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  return (
    <View style={[styles.flexGrow, styles.flexCenter]}>
        <Image style={{
            position:'absolute',
            top:40,
            left:30
        }} source={logo}/>
        <Image style={{
            position:'absolute',
            bottom:0,
            right:0,
            width:'100%'
        }} source={background}/>
      <View
        style={{
          borderColor: styles.BORDER,
          borderRadius: 8,
          backgroundColor: styles.ACT_WHITE,
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          width: "80%",
          gap: 16,
        }}
      >
        <Text style={styles.text.titleBig}>Inicie Sesión</Text>
        <TextInput
          style={[styles.dataBoxInput, { width: "100%" }]}
          value={username}
          onChangeText={(txt) => {
            setUsername(txt);
          }}
          placeholder="Usuario"
        />
        <TextInput
          style={[styles.dataBoxInput, { width: "100%" }]}
          value={password}
          onChangeText={(txt) => {
            setPassword(txt);
          }}
          secureTextEntry={true}
          placeholder="Contraseña"
        />
        <View style={{
            width:'100%'
        }}>
            <Button
          title="Iniciar sesion"
          onPress={() => {
            if (!url.endsWith("/")) {
              setUrl(url + "/");
            }

            console.log("login...", url);
            console.log(username, password);

            fetch(url + "api/login", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username: username, password: password }),
            })
              .then((response) => response.json())
              .then((json) => {
                console.log(json);
                if (json.token && json.user) {
                  setServerUrl(url);
                  setToken(json.token);
                  setLogged(true);
                } else {
                  throw new Error(json.detail);
                }
              })
              .catch((error) => {
                console.error(error);
                Alert.alert("Datos incorrectos.", error);
              });
          }}
        />
        </View>
        

        <View
          style={{
            borderBottomColor: styles.BORDER,
            borderBottomWidth: 1,
            width: '100%'
          }}
        />
        <Text>Ruta del servidor</Text>
        <TextInput
          style={[styles.dataBoxInput, { width: "100%" }]}
          placeholder="ruta"
          value={url}
          onChangeText={(txt) => {
            setUrl(txt);
          }}
        />
      </View>
    </View>
  );
}
export default LoginPage;
