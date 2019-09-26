import React from "react";
import { View, Text } from "react-native";
import moment from "moment";

class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: moment().format("LTS"),
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
      <View>
        <Text>{this.state.day}</Text>
        <Text>{this.state.time}</Text>
        <Text>{this.state.date}</Text>
      </View>
    );
  }
}
export default Clock;
