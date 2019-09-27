import React from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import Drawer from "react-native-drawer";
import Weather from "./Weather";

class WeatherExtended extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "New York",
      country: "US",
      scale: "F",
      settings: false
    };
  }

  render() {
    return (
      <Text>
        TESTESTESTESTESTESTESTESTESTESTESTESTESTESTESTESTESTESTESTESTEST
      </Text>
    );
  }
}

export default WeatherExtended;
