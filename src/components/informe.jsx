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

import { useNavigate, useParams } from "react-router-native";
import * as styles from "./styles";
import { dateToString, titleCase } from "../tools/utils";
import { getInforme, getInformeCitas, postCita } from "../tools/api";

function Informe() {
  const navigate = useNavigate();
  let { informeId } = useParams();
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
      })
      .catch((error) => {
        Alert.alert("Ocurrió un error cargando los datos del informe.");
        console.log(error);
        setInformeData({});
      });
  }, [informeId]);

  return (
    <View style={[styles.flexGrow]}>
      <View style={[styles.pageHeader1]}>
        <Text style={[styles.text.titleBig, styles.color.fgWhite]}>
          Editando informe
        </Text>
      </View>

      <View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            padding: 24,
            gap: 16,
            backgroundColor: styles.ACT_WHITE,
            borderColor: styles.BORDER,
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              flex: 1,
            }}
          >
            <Text style={styles.text.titleReg}>
              {informeData.especialidad || "INDEFINIDO"}
            </Text>
            <Text>
              {dateToString(informeData.fecha) +
                " - truno " +
                informeData.turno}
            </Text>
          </View>
          <View>
            <Button title="Editar" />
          </View>
        </View>
      </View>

      <View style={[styles.flexGrow]}>
        <CitasList informeId={informeId} />
      </View>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <Button
          title="Añadir cita"
          onPress={() => {
            postCita({informe: informeId})
                .then((response) => response.json())
                .then((json) => {
                    // console.log(json)
                  if (json["result"] === "ok" && json["cita_id"]) {
                    navigate(`/cita/${json["cita_id"]}`, {replace:true});
                  } else {
                    throw new Error(
                      "An error ocurred recieving the cita id"
                    );
                  }
                })
                .catch((error) => {
                  Alert.alert("No se pudo crear la cita");
                  console.log(error);
                });
          }}
        />
      </View>

      <View style={[styles.bottomButtonContainer]}>
        <Button
          title="Back"
          onPress={() => {
            navigate("/", { replace: true });
          }}
        />
      </View>
    </View>
  );
}

function CitasList({ informeId }) {
  const navigate = useNavigate();
  let [citas, setCitas] = useState([]);

  useEffect(() => {
    if (informeId === undefined) {
      return;
    }

    getInformeCitas(informeId)
      .then((response) => response.json())
      .then((json) => {
        setCitas(json);
      })
      .catch((error) => {
        setCitas(false);
        throw new Error(error);
      });
  }, [informeId]);

  return Array.isArray(citas) && citas.length > 0 ? (
    <>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          
        }}
      >
        <Text
          style={[
            styles.text.center,
            styles.text.titleReg,
            styles.flexGrow,
            {
              paddingTop: 8,
            },
          ]}
        >
          Citas
        </Text>
      </View>
      <FlatList
        style={[styles.flexGrow, styles.citasList]}
        data={citas}
        renderItem={(iter) => (
          <CitasListItem
            cita={iter.item}
            key={iter.index}
            navigate={navigate}
          />
        )}
      />
    </>
  ) : (
    <Text>Lista vacía</Text>
  );
}

function CitasListItem({ cita, navigate }) {
  //   console.log(cita);
  return cita.record_id ? (
    <TouchableNativeFeedback
      onPress={() => {
        navigate(`/cita/${cita.id}`, {replace:true});
      }}
    >
      <View style={styles.citasListItem}>
        <Text>{cita.record_data.document}</Text>
        <Text>
          {titleCase(cita.record_data.names + " " + cita.record_data.lastnames)}
        </Text>
      </View>
    </TouchableNativeFeedback>
  ) : (
    <TouchableNativeFeedback
      onPress={() => {

        navigate(`/cita/${cita.id}`, {replace:true});
      }}
    >
      <View style={styles.citasListItem}>
        <Text>{cita.document}</Text>
        <Text>{cita.names + " " + cita.lastnames}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

export default Informe;
