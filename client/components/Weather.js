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

  componentDidMount() {
    this.props.getWeather(this.state.city, this.state.country);
    this.timer = setInterval(() => {
      this.props.getWeather(this.state.city, this.state.country);
    }, 600000);
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

  weather() {
    return (
      <View>
        <RobotoText style={{ textAlign: "center", fontSize: 18 }}>
          {this.props.weather.weather[0].description}
        </RobotoText>
        <RobotoText style={{ textAlign: "center", fontSize: 90 }}>
          {` ${this.changeScale(this.props.weather.main.temp)}°`}
        </RobotoText>
        <View style={styles.row}>
          <View>
            <RobotoText
              style={{ textAlign: "center", fontSize: 25, marginRight: 5 }}
            >
              {` ${this.changeScale(this.props.weather.main.temp_max)}°`}
            </RobotoText>
            <RobotoText
              style={{
                textAlign: "center",
                fontSize: 14,
                marginRight: 5,
                opacity: 0.4
              }}
            >
              Max
            </RobotoText>
          </View>
          <View>
            <RobotoText
              style={{ textAlign: "center", fontSize: 25, marginLeft: 5 }}
            >
              {` ${this.changeScale(this.props.weather.main.temp_min)}°`}
            </RobotoText>
            <RobotoText
              style={{
                textAlign: "center",
                fontSize: 14,
                marginLeft: 5,
                opacity: 0.4
              }}
            >
              Min
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
          >
            <View style={styles.slide}>{this.weather()}</View>
            <View style={styles.slide}>
              <Text>TESTESTESTESTESTESTESTESTESTEST 2</Text>
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
  weather: state.weather
});

const mapDispatchToProps = dispatch => ({
  getWeather: (city, country) => dispatch(getWeatherThunk(city, country))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Weather);

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
