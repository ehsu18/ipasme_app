// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const setToken = async (value) => {
//   try {
//     await AsyncStorage.setItem("userToken", value);
//   } catch (e) {
//     // saving error
//   }
// };

// export const deleteToken = async () => {
//     try {
//       await AsyncStorage.removeItem("userToken");
//     } catch (e) {
//       // saving error
//     }
//   };

// export const reviewToken = async (onTrue, onFalse) => {
//   try {
//     const value = await AsyncStorage.getItem("userToken");
//     if (value !== null) {
//       onTrue();
//     }
//   } catch (e) {
//     onFalse();
//   }
// };

// export const getToken = async () => {
//     try {
//       const value = await AsyncStorage.getItem("userToken");
//       if (value !== null) {
//         return value
//       }
//     } catch (e) {
//         console.log(e)
//       throw new Error('No se encontraron credenciales')
//     }
//   };

import * as SecureStore from "expo-secure-store";

export async function setToken(value) {
  await SecureStore.setItemAsync("userToken", value);
}

export async function getToken() {
  let result = await SecureStore.getItemAsync("userToken");
  console.log('token', result)
  if (result) {
    return result;
  } else {
    throw new Error("Token not found");
  }
}

export const reviewToken = async (onTrue, onFalse) => {
  try {
    const value = await SecureStore.getItemAsync("userToken");
    if (value !== null) {
      onTrue();
    }
  } catch (e) {
    onFalse();
  }
};

export const deleteToken = async () => {
    try{
        result = await SecureStore.deleteItemAsync("userToken");
    } catch (error){
        throw new Error(error)
    }
  
};


export async function setServerUrl(value) {
    await SecureStore.setItemAsync("serverUrl", value);
  }

  export async function getServerUrl() {
    return await SecureStore.getItemAsync("serverUrl");
  }