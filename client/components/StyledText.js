import React from "react";
import { Text } from "react-native";

export function MonoText(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "space-mono" }]} />
  );
}

export function RobotoText(props) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "roboto", color: "#fff" }]}
    />
  );
}

export function RobotoMedText(props) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "roboto-med", color: "#fff" }]}
    />
  );
}

export function RobotoRegText(props) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "roboto-reg", color: "#fff" }]}
    />
  );
}
