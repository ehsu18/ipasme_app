import { View, Image, Text } from "react-native";
import * as styles from "./styles";
import headerImg from "../assets/png/header-img.png";


export function PageHeader({title}) {
    return (
      <View style={[styles.pageHeader1]}>
        <Image
          style={{
            position: "absolute",
            height: "100%",
            top: 0,
          }}
          source={headerImg}
        />
        <Text style={[styles.text.titleBig, styles.color.fgWhite]}>{title}</Text>
      </View>
    );
  }