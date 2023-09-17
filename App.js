import { StatusBar } from "expo-status-bar";
import {
  Alert,
  BackHandler
} from "react-native";
import Main from "./src/Main";
import { NativeRouter } from "react-router-native";
import { useEffect } from "react";

export default function App() {
  return (
    <NativeRouter>
      {/* <BackButton> */}
        <Main />
      {/* </BackButton> */}
    </NativeRouter>
  );
}
