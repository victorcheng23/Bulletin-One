import React from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { connect } from "react-redux";
import { RobotoText, RobotoRegText } from "./StyledText";

export default class Reminders extends React.Component {
  render() {
    return (
      <View
        style={{
          alignItems: "center",
          height: 200
        }}
      >
        <View style={{ width: Dimensions.get("window").width * 0.85 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <RobotoText style={{ fontSize: 20 }}>Reminders</RobotoText>
            <TouchableOpacity>
              <RobotoRegText
                style={{ fontSize: 15, marginRight: 2, opacity: 0.5 }}
              >
                Add +
              </RobotoRegText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                padding: 10,
                borderRadius: 10,
                marginTop: 10
              }}
            >
              <RobotoText style={{ fontSize: 17 }}>Wake Up</RobotoText>
              <RobotoText>Remember to get out of bed</RobotoText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                padding: 10,
                borderRadius: 10,
                marginTop: 10
              }}
            >
              <RobotoText style={{ fontSize: 17 }}>First Meal</RobotoText>
              <RobotoText>Eat some breakfast</RobotoText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
