import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Weather from "./Weather";
import Swiper from "react-native-web-swiper";
import { LinearGradient } from "expo-linear-gradient";

export default class WeatherWidget extends React.Component {
  render() {
    return (
      <Swiper
        from={0}
        minDistanceForAction={0.1}
        controlsProps={{
          dotsTouchable: true,
          prevPos: "left",
          nextPos: "right",
          nextTitle: ">",
          nextTitleStyle: { color: "red", fontSize: 24, fontWeight: "500" },
          PrevComponent: ({ onPress }) => (
            <TouchableOpacity onPress={onPress}>
              <Text style={{ color: "white", fontSize: 24, fontWeight: "500" }}>
                {"<"}
              </Text>
            </TouchableOpacity>
          )
        }}
        controlsEnabled={false}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(20,20,200,0.3)"
          }}
        >
          <LinearGradient
            colors={["#4c669f", "#3b5998", "#192f6a"]}
            style={{ flex: 1, alignItems: "center", width: "100%" }}
          >
            <Weather />
          </LinearGradient>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(20,200,20,0.3)"
          }}
        >
          <Text>Slide 2</Text>
        </View>
      </Swiper>
    );
  }
}
