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
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: `https://openweathermap.org/img/wn/${this.props.weather.weather[0].icon}@2x.png`
          }}
        />
        <RobotoText style={styles.lightText}>
          {this.props.weather.weather[0].description}
        </RobotoText>
        <RobotoText style={styles.lightText}>
          {this.props.weather.name}
        </RobotoText>
        <RobotoText style={styles.lightText}>
          Current:
          {` ${this.changeScale(this.props.weather.main.temp)}° ${
            this.state.scale
          }`}
        </RobotoText>
        <RobotoText style={styles.lightText}>
          Low:
          {` ${this.changeScale(this.props.weather.main.temp_min)}° ${
            this.state.scale
          }`}
        </RobotoText>
        <RobotoText style={styles.lightText}>
          High:
          {` ${this.changeScale(this.props.weather.main.temp_max)}° ${
            this.state.scale
          }`}
        </RobotoText>
        <TouchableOpacity>
          <RobotoText style={styles.lightText}>Settings</RobotoText>
        </TouchableOpacity>
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
  lightText: {
    marginBottom: 20,
    color: "#fff",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
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
