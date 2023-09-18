import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import { View, Text, Alert, FlatList, ScrollView } from "react-native";
import { getRecords } from "./tools/api";
import * as styles from "./components/styles";
import { InformesPage } from "./components/informesPage";
import { Routes, Route, Navigate } from "react-router-native";
import Informe from "./components/informe";
import Cita from "./components/citaPage";
import InformeDetails from "./components/informeDetails";
import LoginPage from "./components/loginPage";
import { setUserToken, reviewToken} from "./tools/manageStorage"

function Main() {
  let [loged, setLoged] = useState(false);
  useEffect(() => {
    reviewToken(
      () => {
        setLoged(true);
      },
      () => {
        setLoged(false);
      }
    );
  }, []);
  return (
    <View style={styles.mainViewStyle}>
      {loged ? (
        <Routes>
          <Route path="/" element={<InformesPage setLoged={setLoged} />} />
          <Route path="/informe/:informeId" element={<Informe />} />
          <Route
            path="/informe_details/:informeId"
            element={<InformeDetails />}
          />
          <Route path="/cita/:citaId" element={<Cita />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginPage setLogged={setLoged} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </View>
  );
}

export default Main;
