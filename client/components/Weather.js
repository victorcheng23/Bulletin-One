import React from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";
import { getWeatherThunk } from "../store/weather";
import Swiper from "react-native-swiper";
import { RobotoText } from "./StyledText";

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "New York",
      country: "US",
      scale: "F",
      settings: false
    };
    this.changeScale = this.changeScale.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  changeScale(temperature) {
    switch (this.state.scale) {
      case "F":
        return Math.ceil(((temperature - 273.15) * 9) / 5 + 32);
      case "C":
        return Math.ceil(temperature - 273.15);
      case "K":
        return Math.ceil(temperature);
    }
  }

  titleCase(str) {
    if (str.includes(" ")) {
      return str
        .split(" ")
        .map(word => {
          return word[0].toUpperCase() + word.slice(1);
        })
        .join(" ");
    } else return str[0].toUpperCase() + str.slice(1);
  }

  weather() {
    return (
      <View style={{ alignItems: "center" }}>
        <RobotoText style={{ fontSize: 18 }}>
          {this.titleCase(this.props.weather.weather[0].description)}
        </RobotoText>
        <RobotoText style={{ fontSize: 90 }}>
          <RobotoText style={styles.transparent}>°</RobotoText>
          {`${this.changeScale(this.props.weather.main.temp)}°`}
        </RobotoText>
        <View style={styles.row}>
          <View>
            <RobotoText
              style={{ textAlign: "center", fontSize: 25, marginRight: 5 }}
            >
              <RobotoText style={styles.transparent}>°</RobotoText>
              {`${this.changeScale(this.props.weather.main.temp_max)}°`}
            </RobotoText>
            <RobotoText
              style={{
                textAlign: "center",
                fontSize: 14,
                marginRight: 5,
                opacity: 0.4
              }}
            >
              High
            </RobotoText>
          </View>
          <View>
            <RobotoText
              style={{ textAlign: "center", fontSize: 25, marginLeft: 5 }}
            >
              <RobotoText style={styles.transparent}>°</RobotoText>
              {`${this.changeScale(this.props.weather.main.temp_min)}°`}
            </RobotoText>
            <RobotoText
              style={{
                textAlign: "center",
                fontSize: 14,
                marginLeft: 5,
                opacity: 0.4
              }}
            >
              Low
            </RobotoText>
          </View>
        </View>
      </View>
    );
  }

  render() {
    if (this.props.weather.main) {
      return (
        <View style={styles.container}>
          <Swiper
            style={styles.wrapper}
            paginationStyle={{
              bottom: 70
            }}
            loop={false}
            showsPagination={false}
          >
            <View style={styles.slide}>{this.weather()}</View>
            <View style={styles.slide}>
              <RobotoText>TESTESTESTESTESTESTESTESTESTEST 2</RobotoText>
            </View>
          </Swiper>
        </View>
      );
    } else {
      return <Text>Loading...</Text>;
    }
  }
}

const mapStateToProps = state => ({
  weather: state.weather,
  location: state.location
});

export default connect(mapStateToProps)(Weather);

//STYLING
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    width: "100%"
  },
  row: {
    flexDirection: "row",
    justifyContent: "center"
  },
  wrapper: {
    // backgroundColor: '#f00'
  },
  transparent: {
    opacity: 0
  },
  slide: {
    flex: 1,
    backgroundColor: "transparent",
    color: "#fff"
  },
  container: {
    flex: 1
  },

  imgBackground: {
    backgroundColor: "transparent",
    position: "absolute"
  }
});
