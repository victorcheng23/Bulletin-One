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

export default class News extends React.Component {
  render() {
    return (
      <View
        style={{
          alignItems: "center"
        }}
      >
        <View style={{ width: Dimensions.get("window").width * 0.85 }}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row"
            }}
          >
            <RobotoText style={{ fontSize: 20 }}>News</RobotoText>
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
              <RobotoText style={{ fontSize: 17 }}>Placeholder</RobotoText>
              <RobotoText>Some placeholder news description</RobotoText>
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
              <RobotoText style={{ fontSize: 17 }}>Placeholder</RobotoText>
              <RobotoText>Some placeholder news description</RobotoText>
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
              <RobotoText style={{ fontSize: 17 }}>Placeholder</RobotoText>
              <RobotoText>Some placeholder news description</RobotoText>
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
              <RobotoText style={{ fontSize: 17 }}>Placeholder</RobotoText>
              <RobotoText>Some placeholder news description</RobotoText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
