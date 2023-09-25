import {
  Alert,
  Button,
  FlatList,
  ScrollView,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { Text } from "react-native";
import { useEffect, useState } from "react";
import { PageHeader } from "./pageHeader";
import { useNavigate, useParams } from "react-router-native";
import * as styles from "./styles";
import { dateToString, titleCase } from "../tools/utils";
import { getInforme, putInforme } from "../tools/api";
import { DataBoxContainer, TextBox, NumberBox } from "./citaPage";

function InformeDetails() {
  const navigate = useNavigate();
  let { informeId } = useParams();
  let [initialData, setInitialData] = useState({});
  let [informeData, setInformeData] = useState({});

  useEffect(() => {
    // console.log(informeId);
    if (informeId === undefined) {
      return;
    }
    getInforme(informeId)
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        setInformeData(json);
        setInitialData(json);
      })
      .catch((error) => {
        Alert.alert("Ocurrió un error cargando los datos del informe.", error.message);
        console.log(error.message);
        setInformeData({});
      });
  }, [informeId]);

  return (
    <View style={[styles.flexGrow]}>
      <PageHeader title={'Detalles de informe'} />

      <ScrollView
        style={[
          {
            padding: 0,
          },
        ]}
      >
        <View
          style={{
            padding: 24,
          }}
        >
            <DataBoxContainer data={informeData} setData={setInformeData}>
                <TextBox label="Fecha" name={"fecha"} placeholder="aaa-mm-dd"/>
                <TextBox label="Turno" name={"turno"} placeholder="Diurno/Matutino"/>
                <TextBox label="Médico" name={"medico"} />
                <NumberBox label="Cédula del médico" name={"medico_document"}  />
                <TextBox label="Nacionalidad del médico" name={"medico_nationality"} placeholder='V/E' />
                <TextBox label="Especialidad del informe" name={"especialidad"} />
                <TextBox label="Código especialidad" name={"cod_especialidad"} />
                <TextBox label="Horas diarias" name={"horas_diarias"} />
                <TextBox label="Tipo de cargo" name={"tipo_cargo"} />
                <TextBox label="Médico suplente" name={"medico_suplente"} />
                <NumberBox label="Cédula de médico suplente" name={"medico_suplente_document"} />
                <TextBox label="Nacionalidad de médico suplente" name={"medico_suplente_nationality"} placeholder='V/E' />
                <TextBox label="Enfermera" name={"enfermera"} />
                <TextBox label="Tiempo de consulta" name={"tiempo_consulta"} />
                <TextBox label="Rendimiento diario" name={"rendimiento_diario"} />
                <TextBox label="Observaciones" name={"observaciones"} />

            </DataBoxContainer>
        </View>
      </ScrollView>

      <View style={[styles.bottomButtonContainer]}>
        <Button
          title="Volver a informe"
          onPress={() => {
            navigate(`/informe/${informeId}`, { replace: true });
          }}
        />
        <Button
          title="Guardar cambios"
          onPress={() => {
            let changes = {};
            console.log('informedata', informeData)
            console.log('initialData', initialData)
            for (let key in informeData) {
              if (informeData[key] !== initialData[key]) {
                changes[key] = informeData[key];
              }
            }
            console.log('changes', changes)

            if (Object.keys(changes).length === 0) {
              Alert.alert("Sin cambios");
              navigate(`/informe/${informeId}`, { replace: true });
            } else {
              putInforme(informeId, changes)
                .then((response) => response.json())
                .then((json) => {
                  // console.log(json);
                  if (json["result"] === "ok") {
                    console.log("Guardado");
                    Alert.alert("Informe guardado con éxito.");
                    setInformeData({});
                    navigate(`/informe/${informeId}`, { replace: true });
                  } else if (json["error"]) {
                    throw new Error(json["error"]);
                  }
                })
                .catch((error) => {
                  Alert.alert(
                    "Ocurrió un error tratando de guardar el informe.", error.message
                  );
                  console.log(error.message);
                });
            }
          }}
        />
      </View>
    </View>
  );
}

export default InformeDetails;
