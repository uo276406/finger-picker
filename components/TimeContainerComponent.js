import React, { useEffect } from "react";
import { View, Text, Vibration } from "react-native";
import { TimeContainerStyles } from "../styles/time.container.styles";

// Contador de tiempo
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
        Vibration.vibrate(300);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fingers, timeoutLeft, rouletteStarted]);

  return (
    <View style={TimeContainerStyles.timerContainer}>
      <Text style={TimeContainerStyles.timerText}>{timeoutLeft}</Text>
    </View>
  );
};

export default TimeContainerComponent;
