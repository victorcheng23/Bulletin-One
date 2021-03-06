import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import Clock from "../client/components/Clock";
import Weather from "../client/components/Weather";
import { getTimezoneThunk } from "../client/store/timezone";
import { getWeatherThunk } from "../client/store/weather";
import Reminders from "../client/components/Reminders";
import News from "../client/components/News";

const bg = {
  a1: ["#0c48b6", "#36a0fa", "#bfdfff", "#f4fbff"],
  a2: ["#0c3980", "#468fe4", "#e7ceff"],
  a3: ["#161b43", "#6359ae", "#dba8d8", "#fecdc7"],
  a4: ["#181846", "#2a3383", "#5d62ad", "#6695c8"],
  a5: ["#081c42", "#093663", "#0c5e93"],
  a6: ["#153b57", "#4e8596", "#95d2cc"]
};

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "New York"
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.getWeather(this.state.city);
      this.props.getTimezone(this.state.city);
    }, 0);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setState(this.props.location);
      setTimeout(() => {
        this.props.getWeather(this.state.city);
        this.props.getTimezone(this.state.city);
      }, 0);
    }
    // if (this.props.weather !== prevProps.weather) {
    //   this.props.getTimezone(this.state.city);
    // }
  }

  getBackground(time) {
    if (time >= 21 || time <= 3) {
      return bg.a5;
    }
    if (time === 4 || time === 5 || time === 19 || time === 20) {
      return bg.a4;
    }
    if (time === 6 || time === 7 || time === 17 || time === 18) {
      return bg.a3;
    }
    if (time === 8 || time === 9 || time === 16 || time === 15) {
      return bg.a2;
    }
    if (time > 9 && time < 15) {
      return bg.a1;
    }
  }

  render() {
    return (
      <LinearGradient
        colors={(() => {
          if (this.props.timezone.date_time) {
            const time = Number(
              this.props.timezone.date_time.substring(11, 13)
            );
            return this.getBackground(time);
          } else {
            return bg.a1;
          }
        })()}
        style={{
          flex: 1,
          alignItems: "center"
        }}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Clock />
          <Weather />
          <Reminders />
          <News />
        </ScrollView>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => ({
  weather: state.weather,
  timezone: state.timezone,
  location: state.location
});

const mapDispatchToProps = dispatch => ({
  getTimezone: city => dispatch(getTimezoneThunk(city)),
  getWeather: city => dispatch(getWeatherThunk(city))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    paddingTop: 50
  }
});
