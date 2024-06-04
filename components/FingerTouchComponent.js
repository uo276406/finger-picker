import React from "react";
import { Animated, Text } from "react-native";
import { FingerTouchStyles } from "../styles/finger.touch.styles";

const FingerTouchComponent = ({ selectedFinger, animationValue, finger }) => {
  return (
    <Animated.View
      key={finger.key}
      style={[
        FingerTouchStyles.finger,
        {
          top: finger.y - 25,
          left: finger.x - 25,
          backgroundColor: finger.color,
          transform: [
            {
              scale: selectedFinger?.key === finger.key ? animationValue : 1,
            },
          ],
        },
      ]}
    >
      <Text style={[FingerTouchStyles.fingerText]}>{finger.key}</Text>
    </Animated.View>
  );
};

export default FingerTouchComponent;
