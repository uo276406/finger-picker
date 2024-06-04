import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { styles } from "../styles/styles";

const TimeContainerComponent = ({ timeoutLeft, setTimeoutLeft, fingers }) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timeoutLeft > 0 && fingers.length > 0)
        setTimeoutLeft((prevTimeoutLeft) => prevTimeoutLeft - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fingers, timeoutLeft]);

  return (
    <View style={styles.timerContainer}>
      <Image
        source={require("../assets/chrono.png")}
        style={{ width: 50, height: 50 }}
      />
      <Text style={styles.timerText}>{timeoutLeft}</Text>
    </View>
  );
};

export default TimeContainerComponent;
