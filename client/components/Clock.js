import React from "react";
import { Dimensions, View, Text } from "react-native";
import moment from "moment";
import { RobotoText, RobotoMedText, RobotoRegText } from "./StyledText";

class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: moment().format("LT"),
      date: moment().format("LL"),
      day: moment().format("dddd")
    };
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        time: moment().format("LTS"),
        date: moment().format("LL"),
        day: moment().format("dddd")
      });
    }, 1000);
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
export default Clock;
