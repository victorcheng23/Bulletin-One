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
import { RobotoText } from "./StyledText";
import { getWeatherThunk } from "../store/weather";

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

  render() {
    if (this.props.weather.main) {
      return (
        <View style={styles.container}>
          <Image
            style={{ width: 100, height: 100 }}
            source={{
              uri: `https://openweathermap.org/img/wn/${this.props.weather.weather[0].icon}@2x.png`
            }}
          />
          <RobotoText>{this.props.weather.name}</RobotoText>
          <RobotoText>{this.props.weather.weather[0].description}</RobotoText>
          <RobotoText>
            Current:
            {this.changeScale(this.props.weather.main.temp)}°
          </RobotoText>
          <RobotoText>
            Low:
            {this.changeScale(this.props.weather.main.temp_min)}°
          </RobotoText>
          <RobotoText>
            High:
            {this.changeScale(this.props.weather.main.temp_max)}°
          </RobotoText>
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
  }
});
