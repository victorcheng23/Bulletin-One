import React from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import Drawer from "react-native-drawer";
import Weather from "./Weather";
import WeatherExtended from "./WeatherExtended";

class WeatherDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "New York",
      country: "US",
      scale: "F",
      settings: false
    };
  }
  closeWeatherExtenededPanel() {
    this._drawer.close();
  }
  openWeatherExtenededPanel() {
    this._drawer.open();
  }

  render() {
    return (
      <Drawer
        ref={ref => (this._drawer = ref)}
        content={<WeatherExtended />}
        type="displace"
        tapToClose={true}
        openDrawerOffset={0.1} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        tweenHandler={ratio => ({
          weather: { opacity: 1 }
        })}
        open={true}
        styles={drawerStyles}
      >
        <Weather />
      </Drawer>
    );
  }
}

const drawerStyles = {
  drawer: { backgroundColor: "red" },
  weather: { paddingLeft: 3, backgroundColor: "red" }
};

export default WeatherDrawer;
