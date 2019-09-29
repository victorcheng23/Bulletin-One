import React from "react";
import { Dimensions, View, Text } from "react-native";
import { connect } from "react-redux";
import moment from "moment";
import { RobotoText, RobotoMedText, RobotoRegText } from "./StyledText";
import { getTimezoneThunk } from "../store/timezone";
import { getWeatherThunk } from "../store/weather";

class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: "New York",
      country: "US",
      time: " :00 AM",
      date: "",
      day: ""
    };
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidMount() {
    this.props.getWeather(this.state.city, this.state.country);
  }

  componentDidUpdate(prevProps) {
    if (this.props.weather !== prevProps.weather) {
      this.props.getTimezone(
        this.props.weather.coord.lat,
        this.props.weather.coord.lon
      );
    }
    if (this.props.timezone !== prevProps.timezone) {
      const offset =
        this.props.timezone.timezone_offset +
        (this.props.timezone.is_dst ? this.props.timezone.dst_savings : 0);

      this.setState({
        time: moment
          .utc()
          .utcOffset(offset)
          .format("LTS"),
        date: moment
          .utc()
          .utcOffset(offset)
          .format("LL"),
        day: moment
          .utc()
          .utcOffset(offset)
          .format("dddd")
      });
      this.timer = setInterval(() => {
        this.setState({
          time: moment
            .utc()
            .utcOffset(offset)
            .format("LTS"),
          date: moment
            .utc()
            .utcOffset(offset)
            .format("LL"),
          day: moment
            .utc()
            .utcOffset(offset)
            .format("dddd")
        });
      }, 1000);
    }
  }

  render() {
    return (
      <View style={{ alignItems: "center", marginBottom: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: Dimensions.get("window").width * 0.85
          }}
        >
          <View>
            <RobotoText style={{ fontSize: 20 }}>{this.state.day}</RobotoText>
            <RobotoText style={{ fontSize: 17, opacity: 0.4 }}>
              {this.state.date.slice(0, -6)}
            </RobotoText>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View>
              <RobotoText style={{ fontSize: 50 }}>
                {this.state.time.slice(0, -6)}
              </RobotoText>
            </View>
            <View style={{ marginLeft: 3 }}>
              <RobotoText style={{ fontSize: 15 }}>
                {this.state.time.slice(-2)}
              </RobotoText>
              <RobotoText style={{ fontSize: 20, opacity: 0.4 }}>
                {this.state.time.slice(-5, -3)}
              </RobotoText>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  weather: state.weather,
  timezone: state.timezone
});

const mapDispatchToProps = dispatch => ({
  getTimezone: (lat, long) => dispatch(getTimezoneThunk(lat, long)),
  getWeather: (city, country) => dispatch(getWeatherThunk(city, country))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Clock);
