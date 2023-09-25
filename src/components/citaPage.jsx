import { useNavigate, useParams } from "react-router-native";
import { getCita, putCita, deleteCita } from "../tools/api";
import * as styles from "./styles";
import {
  Alert,
  Button,
  FlatList,
  ScrollView,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { dateToString, titleCase } from "../tools/utils";
import { PageHeader } from "./pageHeader";

function Cita() {
  const navigate = useNavigate();
  let { citaId } = useParams();
  let [initialData, setInitialData] = useState({});
  let [citaData, setCitaData] = useState({});

  useEffect(() => {
    console.log(citaId);
    if (citaId === undefined) {
      return;
    }
    getCita(citaId)
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        setCitaData(json);
        setInitialData(json);
      })
      .catch((error) => {
        Alert.alert("Ocurrió un error cargando los datos de la cita.", error);
        console.log(error);
        setCitaData({});
      });
  }, [citaId]);

  return (
    <View style={[styles.flexGrow]}>
      <PageHeader title={'Editando cita'} />

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
          <DataBoxContainer data={citaData} setData={setCitaData}>
            <TextBox label="Nombres" name={"names"} />
            <TextBox label="Apellidos" name={"lastnames"} />
            <TextBox label="Cédula" name={"document"} />
            <TextBox label="Edad" name={"age"} />
            <TextBox label="Teléfono" name={"phone"} />
            <TextBox label="Género" name={"gender"} />
            <TextBox label="Cargo laboral" name={"job_type"} />
            <TextBox label="Area médica de la cita" name={"area"} />
            <TextBox label="Fecha" name={"fecha"} />
            <TextBox label="Clasificación de servicio" name={"record_type"} />
            <TextBox label="Primera cita" name={"first_cita"} />
            <TextBox label="Tensión arterial" name={"tension_arterial"} />
            <TextBox label="Peso" name={"peso"} />
            <TextBox label="Exámenes de laboratorio" name={"estudio_lab"} />
            <TextBox label="Rayos X" name={"estudio_rx"} />
            <TextBox label="Ecografía" name={"estudio_eco"} />
            <TextBox label="Reposo" name={"reposo"} />
            <TextBox label="Referido" name={"ref"} />
            <TextBox label="Diagnóstico" name={"diagnose"} />
          </DataBoxContainer>
        </View>
      </ScrollView>

      <View style={[styles.bottomButtonContainer]}>
        <Button
          title="Volver"
          onPress={() => {
            navigate(`/informe/${citaData.informe}`, { replace: true });
          }}
        />
        <Button
          title="Eliminar"
          color={styles.ACT_DANGER}
          onPress={() => {
            Alert.alert(
              "¿Está seguro de querer ELIMINAR esta cita?",
              "No hay vuelta atrás para este cambio.",
              [
                // The "Yes" button
                {
                  text: "Yes",
                  onPress: () => {
                    deleteCita(citaId)
                      .then((response) => response.json())
                      .then((json) => {
                        if (json["result"] === "ok") {
                          Alert.alert("Cita eliminada.");
                          navigate(`/informe/${citaData.informe}`, {
                            replace: true,
                          });
                        } else {
                          throw new Error(json["error"]);
                        }
                      })
                      .catch((error) => {
                        Alert.alert(
                          "Ocurrió un error, no se pudo comprobar la eliminación"
                        );
                        console.error(error);
                      });
                  },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                  text: "No",
                },
              ]
            );
          }}
        />
        <Button
          title="Guardar"
          onPress={() => {
            let changes = {};
            for (let key in citaData) {
              if (citaData[key] !== initialData[key]) {
                changes[key] = citaData[key];
              }
            }

            if (Object.keys(changes).length === 0) {
              Alert.alert("Sin cambios");
              navigate(`/informe/${citaData.informe}`, { replace: true });
            } else {
              putCita(citaId, changes)
                .then((response) => response.json())
                .then((json) => {
                  // console.log(json);
                  if (json["result"] === "ok") {
                    console.log("guardada");
                    Alert.alert("Cita guardada con éxito.");
                    setCitaData({});
                    navigate(`/informe/${citaData.informe}`, { replace: true });
                  } else if (json["error"]) {
                    throw new Error(json["error"]);
                  }
                })
                .catch((error) => {
                  Alert.alert(
                    "Ocurrió un error tratando de guardar la historia."
                  );
                  console.log(error.msg);
                });
            }
          }}
        />
      </View>
    </View>
  );
}

export default Cita;

export function DataBoxContainer({ children, data, setData }) {
  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          data: data,
          setData: setData,
        })
      )}
    </>
  );
}

export function TextBox({ label, name, data, setData }) {
  //   let [content, setContent] = useState("");

  //   useEffect(() => {
  //     if (data === undefined) {
  //       setContent("");
  //       return;
  //     }
  //     try {
  //       setContent(data[name]);
  //     } catch {
  //       console.log("error en input: ", name);
  //       setContent("");
  //     }
  //   }, [data]);

  return (
    <View style={[styles.dataBox]}>
      <Text style={[styles.dataBoxLabel]}>{label}</Text>
      <TextInput
        style={styles.dataBoxInput}
        onChangeText={(txt) => {
          setData({
            ...data,
            [name]: txt,
          });
        }}
        value={data[name]}
        placeholder="-"
      />
    </View>
  );
}

export function NumberBox({ label, name, data, setData }) {

  return (
    <View style={[styles.dataBox]}>
      <Text style={[styles.dataBoxLabel]}>{label}</Text>
      <TextInput
        style={styles.dataBoxInput}
        onChangeText={(txt) => {
          setData({
            ...data,
            [name]: parseInt(txt),
          });
        }}
        inputMode="numeric"
        value={data[name] ? data[name].toString() : ''}
        placeholder="-"
      />
    </View>
  );
}
