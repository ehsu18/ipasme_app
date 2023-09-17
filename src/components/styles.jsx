import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const MAIN_COLOR = "#1b73f8";
export const MAIN_BENEFICIARIO = "#39c3aa";
export const MAIN_AFILIADO = "#743bbc";

export const DARK = "#383a40";
export const MEDUM = "#686773";
export const GRAY = "#c9c9c9";
export const BORDER = "#d9d9d9";

export const ACT_WARNING = "#fdbb3b";
export const ACT_GOOD = "#22c56c";
export const ACT_DANGER = "#e82721";

export const ACT_WHITE = "#ffffff";
export const BACK_LIGHTBLUE = "#f8fafb";
export const BACK_SELECTED = "#f2f9fc";

export const mainViewStyle = {
  flex: 1,
  margin: 0,
  backgroundColor: BACK_LIGHTBLUE,
  marginTop: Constants.statusBarHeight,
};

export const pageHeader1 = {
  width: "100%",
  height: 114,
  backgroundColor: MAIN_COLOR,
  justifyContent: "center",
  alignItems: "center",
};

export const text = StyleSheet.create({
  titleBig: {
    fontSize: 24,
    fontWeight: "bold",
  },
  titleReg: {
    fontSize: 14,
    fontWeight: "bold",
  },
  center: {
    textAlign: "center",
  },
});

export const color = StyleSheet.create({
  fgWhite: {
    color: ACT_WHITE,
  },
});

export const listRow = {
  flexDirection: "row",
  alignItems: "center",
  padding: 12,
  borderBottomWidth: 1,
  width: "100%",
};

export const flexCenter = {
  justifyContent: "center",
  alignItems: "center",
};

export const bottomButtonContainer = {
  width: "100%",
  padding: 24,
  backgroundColor: ACT_WHITE,
  borderColor: BORDER,
  borderTopWidth: 1,
  flexDirection: "row",
  gap: 12,
  justifyContent: "center",
  alignItems: "center",
};
export const flexGrow = { flex: 1 };

export const citasListItem = {
  justifyContent: "center",
  alignItems: "center",
  width: '100%',
  borderWidth: 1,
  borderColor: BORDER,
  borderStyle: "solid",
  backgroundColor: ACT_WHITE,
  flexDirection: "row",
  paddingVertical: 12,
  paddingHorizontal: 0,
  borderRadius: 8,
  gap: 12,
  marginBottom:12
};

export const citasList = {
  padding: 12,
//   alignItems: 'center',
  width: '100%',
};

export const pad12 = {
    padding:12
}

export const dataBox = {

}

export const dataBoxLabel = {
  fontSize:10,
  marginBottom:4
}

export const dataBoxInput = {
  height: 40,
    borderWidth: 1,
    borderRadius:8,
    borderColor: BORDER,
    padding: 10,
    width:'100%'
}

