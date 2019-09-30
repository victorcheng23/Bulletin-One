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
import { setCityActionCreator, getLocationThunk } from "../store/location";
import Swiper from "react-native-swiper";
import { Switch } from "react-native-switch";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import { RobotoText } from "./StyledText";

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scale: "F",
      autoLocation: false,
      fadeInput: new Animated.Value(1)
    };
    this.changeScale = this.changeScale.bind(this);
    this.toggleLocation = this.toggleLocation.bind(this);
  }

  handleSubmit(value) {
    if (value.nativeEvent.text) {
      this.props.setCity(value.nativeEvent.text);
    }
  }

  toggleLocation(value) {
    this.setState({ autoLocation: value });
    Animated.timing(this.state.fadeInput, {
      toValue: value ? 0 : 1,
      duration: 500
    }).start();
    setTimeout(() => {
      if (this.state.autoLocation) {
        this.props.getGeo();
      }
    }, 0);
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

  titleCase(str) {
    if (str.includes(" ")) {
      return str
        .split(" ")
        .map(word => {
          return word[0].toUpperCase() + word.slice(1);
        })
        .join(" ");
    } else return str[0].toUpperCase() + str.slice(1);
  }

  weather() {
    return (
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity>
          <RobotoText style={{ fontSize: 23, marginBottom: 5 }}>
            {this.titleCase(this.props.weather.name)}
          </RobotoText>
        </TouchableOpacity>
        <RobotoText style={{ fontSize: 18 }}>
          {this.titleCase(this.props.weather.weather[0].description)}
        </RobotoText>
        <RobotoText style={{ fontSize: 90 }}>
          <RobotoText style={styles.transparent}>°</RobotoText>
          {`${this.changeScale(this.props.weather.main.temp)}°`}
        </RobotoText>
        <View style={styles.row}>
          <View>
            <RobotoText
              style={{ textAlign: "center", fontSize: 25, marginRight: 5 }}
            >
              <RobotoText style={styles.transparent}>°</RobotoText>
              {`${this.changeScale(this.props.weather.main.temp_max)}°`}
            </RobotoText>
            <RobotoText
              style={{
                textAlign: "center",
                fontSize: 14,
                marginRight: 5,
                opacity: 0.6
              }}
            >
              High
            </RobotoText>
          </View>
          <View>
            <RobotoText
              style={{ textAlign: "center", fontSize: 25, marginLeft: 5 }}
            >
              <RobotoText style={styles.transparent}>°</RobotoText>
              {`${this.changeScale(this.props.weather.main.temp_min)}°`}
            </RobotoText>
            <RobotoText
              style={{
                textAlign: "center",
                fontSize: 14,
                marginLeft: 5,
                opacity: 0.6
              }}
            >
              Low
            </RobotoText>
          </View>
        </View>
      </View>
    );
  }

  settings() {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 200
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: Dimensions.get("window").width * 0.85
          }}
        >
          <RobotoText style={{ fontSize: 15 }}>Temperature Scale</RobotoText>
          <RadioForm formHorizontal={true} animation={true}>
            <RadioButton labelHorizontal={true} key={0}>
              <RadioButtonLabel
                obj={{ label: "°K" }}
                index={0}
                onPress={value => {
                  this.setState({ scale: value });
                }}
                labelHorizontal={true}
                labelStyle={{ fontSize: 15, color: "#fff" }}
                labelWrapStyle={{}}
              />
              <RadioButtonInput
                obj={{ value: "K" }}
                index={0}
                isSelected={this.state.scale === "K"}
                onPress={value => {
                  this.setState({ scale: value });
                }}
                buttonInnerColor={"#fff"}
                buttonOuterColor={"transparent"}
                buttonStyle={{
                  backgroundColor:
                    this.state.scale === "K"
                      ? "rgba(255, 255, 255, 0.5)"
                      : "rgba(255, 255, 255, 0.2)"
                }}
                buttonWrapStyle={{ marginLeft: 5, marginRight: 10 }}
              />
            </RadioButton>
            <RadioButton labelHorizontal={true} key={1}>
              <RadioButtonLabel
                obj={{ label: "°C" }}
                index={1}
                onPress={value => {
                  this.setState({ scale: value });
                }}
                labelHorizontal={true}
                labelStyle={{ fontSize: 15, color: "#fff" }}
                labelWrapStyle={{}}
              />
              <RadioButtonInput
                obj={{ value: "C" }}
                index={1}
                isSelected={this.state.scale === "C"}
                onPress={value => {
                  this.setState({ scale: value });
                }}
                buttonInnerColor={"#fff"}
                buttonOuterColor={"transparent"}
                buttonStyle={{
                  backgroundColor:
                    this.state.scale === "C"
                      ? "rgba(255, 255, 255, 0.5)"
                      : "rgba(255, 255, 255, 0.2)"
                }}
                buttonWrapStyle={{ marginLeft: 5, marginRight: 10 }}
              />
            </RadioButton>
            <RadioButton labelHorizontal={true} key={2}>
              <RadioButtonLabel
                obj={{ label: "°F" }}
                index={2}
                onPress={value => {
                  this.setState({ scale: value });
                }}
                labelHorizontal={true}
                labelStyle={{ fontSize: 15, color: "#fff" }}
                labelWrapStyle={{}}
              />
              <RadioButtonInput
                obj={{ value: "F" }}
                index={2}
                isSelected={this.state.scale === "F"}
                onPress={value => {
                  this.setState({ scale: value });
                }}
                buttonInnerColor={"#fff"}
                buttonOuterColor={"transparent"}
                buttonStyle={{
                  backgroundColor:
                    this.state.scale === "F"
                      ? "rgba(255, 255, 255, 0.5)"
                      : "rgba(255, 255, 255, 0.2)"
                }}
                buttonWrapStyle={{ marginLeft: 5 }}
              />
            </RadioButton>
          </RadioForm>
        </View>
        <View
          style={{
            borderColor: "rgba(255, 255, 255, 0.3)",
            borderTopWidth: 1,
            paddingTop: 15,
            paddingBottom: 15,
            marginTop: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: Dimensions.get("window").width * 0.85
          }}
        >
          <RobotoText style={{ fontSize: 15 }}>Automatic Location</RobotoText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RobotoText style={{ fontSize: 15, marginRight: 10 }}>
              {this.state.autoLocation ? "On" : "Off"}
            </RobotoText>
            <Switch
              value={this.state.autoLocation}
              onValueChange={this.toggleLocation}
              activeText={"On"}
              inActiveText={"Off"}
              circleBorderWidth={0}
              backgroundActive={"rgba(255, 255, 255, 0.5)"}
              backgroundInactive={"rgba(255, 255, 255, 0.2)"}
              circleInActiveColor={"rgba(255, 255, 255, 0.5)"}
            />
          </View>
        </View>

        <Animated.View
          style={{
            width: Dimensions.get("window").width * 0.85,
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 10,
            opacity: this.state.fadeInput
          }}
        >
          <TextInput
            style={{
              padding: 10,
              color: "#fff",
              fontFamily: "roboto",
              fontSize: 15
            }}
            onSubmitEditing={value => this.handleSubmit(value)}
            defaultValue={this.props.weather.name}
          />
        </Animated.View>
      </View>
    );
  }

  render() {
    if (this.props.weather.main) {
      return (
        <View style={styles.container}>
          <Swiper
            style={styles.wrapper}
            index={1}
            paginationStyle={{
              bottom: 70
            }}
            loop={false}
            showsPagination={false}
          >
            <View style={styles.slide}>{this.settings()}</View>
            <View style={styles.slide}>{this.weather()}</View>
            <View style={styles.slide}>
              <RobotoText style={{ textAlign: "center", fontSize: 20 }}>
                Some Other Stuff
              </RobotoText>
            </View>
          </Swiper>
        </View>
      );
    } else {
      return <View></View>;
    }
  }
}

const mapStateToProps = state => ({
  weather: state.weather,
  location: state.location
});

const mapDispatchToProps = dispatch => ({
  setCity: city => {
    dispatch(setCityActionCreator(city));
  },
  getGeo: () => {
    dispatch(getLocationThunk());
  }
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
  transparent: {
    opacity: 0
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
