import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Button,
  Alert,
  BackHandler,
} from "react-native";
import { getInformes, postInforme } from "../tools/api";
import * as styles from "./styles";
import { dateToString } from "../tools/utils";
import { useNavigate } from "react-router-native";

export function InformesPage() {
  const navigate = useNavigate()
  let [informes, setInformes] = useState([]);

  useEffect(() => {
    getInformes()
      .then((response) => response.json())
      .then((json) => {
        // console.log(json)
        if (Array.isArray(json) && json.length > 0) {
          setInformes(json);
        } else {
          setInformes([]);
        }
      })
      .catch((error) => {
        Alert.alert("Ocurrió un error cargando los informes.");
        console.log(error);
        setInformes([]);
      });
  }, []);

  return (
    <View style={styles.flexGrow}>
      <View style={[styles.pageHeader1]}>
        <Text style={[styles.text.titleBig, styles.color.fgWhite]}>
          Informes
        </Text>
      </View>

      <View style={styles.flexGrow}>
        {Array.isArray(informes) && informes.length > 0 ? (
          <>
            <View style={[styles.listRow, {
              flex:0
            }]}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 100,
                }}
              >
                <Text style={[styles.text.titleReg, styles.text.center]}>
                  Fecha
                </Text>
              </View>
              <View
                style={{
                  flex: 2,
                }}
              >
                <Text style={[styles.text.titleReg, styles.text.center]}>
                  Especialidad
                </Text>
              </View>
              <View
                style={{
                  width: 60,
                }}
              >
                <Text style={[styles.text.titleReg, styles.text.center]}>
                  Abrir
                </Text>
              </View>
            </View>
            <FlatList
            style={{
              flex:0
            }}
              data={informes}
              renderItem={(iter) => (
                <InformesListItem informe={iter.item} key={iter.index} />
              )}
            />
          </>
        ) : (
          <Text>Lista vacia</Text>
        )}
      </View>

      <View style={[styles.bottomButtonContainer]}>
        <Button title="Cerrar sesión" color={styles.ACT_DANGER} />
        <Button title="Añadir informe" onPress={()=>{
          postInforme({})
          .then((response) => response.json())
          .then((json) => {
            if (json["result"] === "ok" && json["informe_id"]) {
              navigate(`/informe_details/${json.informe_id}`, {replace:true});
            } else {
              throw new Error(
                "An error ocurred recieving the informe id"
              );
            }
          })
          .catch((error) => {
            Alert.alert("No se pudo crear el informe");
            console.log(error);
          });
        }} />
      </View>
    </View>
  );
}

function InformesListItem({ informe }) {
  // console.log(informe);
  let navigate = useNavigate();
  return (
    <View style={styles.listRow}>
      <View
        style={[
          styles.flexCenter,
          {
            width: 100,
          },
        ]}
      >
        <Text>{dateToString(informe.fecha) || "indefinido"}</Text>
        <Text>{informe.turno || "indefinido"}</Text>
      </View>
      <View
        style={{
          flex: 2,
        }}
      >
        <Text style={[{ width: "100%" }, styles.text.center]}>
          {informe.especialidad || "indefinido"}
        </Text>
      </View>
      <View
        style={{
          width: 60,
        }}
      >
        <Button
          title="Abrir"
          onPress={() => {
            // Alert.alert('tap')
            navigate(`/informe/${informe.id}`, { replace: true });
          }}
        ></Button>
      </View>
    </View>
  );
}
