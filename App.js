import React, { useState, useEffect, useRef } from "react";
import { View, Dimensions, Animated } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

import { getRandomColor, toSeconds, getRandomNumber } from "./utils/utils";
import { AppStyles } from "./styles/app.styles";
import TimeContainerComponent from "./components/TimeContainerComponent";
import FingerTouchComponent from "./components/FingerTouchComponent";

const { width, height } = Dimensions.get("window");
const animationTime = 2000;
const baseTimeoutRoulette = 5000;
const targetAnimationScale = 2.5;
const initialAnimationScale = 1;

const App = () => {
  const animationValue = useRef(new Animated.Value(1)).current;
  const [timeoutLeft, setTimeoutLeft] = useState(
    toSeconds(baseTimeoutRoulette)
  );
  const [fingers, setFingers] = useState([]);
  const [selectedFinger, setSelectedFinger] = useState(null);

  const handleBeganGestureEvent = (event) => {
    const { x, y } = event.nativeEvent;

    setFingers((prevFingers) => {
      const updatedFingers = [
        ...prevFingers,
        { key: fingers.length + 1, x, y, color: getRandomColor() },
      ];
      setTimeoutLeft(toSeconds(baseTimeoutRoulette));
      return updatedFingers;
    });
  };

  useEffect(() => {
    let timeoutId;

    if (fingers.length > 0) {
      timeoutId = setTimeout(() => {
        setSelectedFinger(fingers[getRandomNumber(0, fingers.length - 1)]);

        Animated.sequence([
          Animated.timing(animationValue, {
            toValue: targetAnimationScale,
            duration: animationTime,
            useNativeDriver: true,
          }),
          Animated.timing(animationValue, {
            toValue: initialAnimationScale,
            duration: animationTime,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setFingers([]);
          setTimeoutLeft(toSeconds(baseTimeoutRoulette));
        });
      }, baseTimeoutRoulette);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [fingers]);

  return (
    <GestureHandlerRootView style={AppStyles.container}>
      <PanGestureHandler onBegan={handleBeganGestureEvent}>
        <View style={AppStyles.touchArea}>
          <TimeContainerComponent
            timeoutLeft={timeoutLeft}
            setTimeoutLeft={setTimeoutLeft}
            fingers={fingers}
          />
          {fingers.map((finger) => (
            <FingerTouchComponent
              key={finger.key}
              finger={finger}
              selectedFinger={selectedFinger}
              animationValue={animationValue}
            />
          ))}
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default App;
