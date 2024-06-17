import React, { useEffect } from "react";
import { View, Text, Image, Vibration } from "react-native";
import { TimeContainerStyles } from "../styles/time.container.styles";

const TimeContainerComponent = ({
  timeoutLeft,
  setTimeoutLeft,
  fingers,
  rouletteStarted,
}) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timeoutLeft > 0 && fingers.length > 0 && rouletteStarted) {
        setTimeoutLeft((prevTimeoutLeft) => prevTimeoutLeft - 1);
        Vibration.vibrate(200);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fingers, timeoutLeft, rouletteStarted]);

  return (
    <View style={TimeContainerStyles.timerContainer}>
      <Image
        source={require("../assets/chrono.png")}
        style={{ width: 50, height: 50 }}
      />
      <Text style={TimeContainerStyles.timerText}>{timeoutLeft}</Text>
    </View>
  );
};

export default TimeContainerComponent;
