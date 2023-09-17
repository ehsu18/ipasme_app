import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import { View, Text, Alert, FlatList, ScrollView } from "react-native";
import { getRecords } from "./tools/api";
import * as styles from "./components/styles";
import { InformesPage } from "./components/informesPage";
import { Routes, Route, Navigate } from "react-router-native";
import Informe from "./components/informe";
import Cita from "./components/citaPage";

function Main() {
  return (
    <View style={styles.mainViewStyle}>
      <Routes>
        <Route path="/" element={<InformesPage />} />
        <Route path="/informe/:informeId" element={<Informe />} />
        <Route path="/cita/:citaId" element={<Cita />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </View>
  );
}

export default Main;
