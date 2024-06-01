import React, { useState, useEffect, useRef } from "react";
import { View, Dimensions, Text, Animated, Image } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

import { getRandomColor, toSeconds } from "./utils/utils";
import { styles } from "./styles/styles";

const { width, height } = Dimensions.get("window");
const animationTime = 2000;
const timeoutRoulette = 5000;
const targetAnimationScale = 2.5;
const initialAnimationScale = 1;

const App = () => {
  const animationValue = useRef(new Animated.Value(1)).current;
  const [timeoutLeft, setTimeoutLeft] = useState(toSeconds(timeoutRoulette));
  const [fingers, setFingers] = useState([]);
  const [selectedFinger, setSelectedFinger] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timeoutLeft > 0 && fingers.length > 0)
        setTimeoutLeft((prevTimeoutLeft) => prevTimeoutLeft - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fingers, timeoutLeft]);

  const handleBeganGestureEvent = (event) => {
    const { x, y } = event.nativeEvent;

    setFingers((prevFingers) => {
      const updatedFingers = [
        ...prevFingers,
        { key: fingers.length + 1, x, y, color: getRandomColor() },
      ];
      setTimeoutLeft(toSeconds(timeoutRoulette));
      return updatedFingers;
    });
  };

  useEffect(() => {
    let timeoutId;

    if (fingers.length > 0) {
      timeoutId = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * fingers.length);
        setSelectedFinger(fingers[randomIndex]);

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
          setTimeoutLeft(toSeconds(timeoutRoulette));
        });
      }, timeoutRoulette);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [fingers]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler onBegan={handleBeganGestureEvent}>
        <View style={styles.touchArea}>
          <View style={styles.timerContainer}>
            <Image
              source={require("./assets/chrono.png")}
              style={{ width: 50, height: 50 }}
            />
            <Text style={styles.timerText}>{timeoutLeft}</Text>
          </View>
          {fingers.map((finger) => (
            <Animated.View
              key={finger.key}
              style={[
                styles.finger,
                {
                  top: finger.y - 25,
                  left: finger.x - 25,
                  backgroundColor: finger.color,
                  transform: [
                    {
                      scale:
                        selectedFinger?.key === finger.key ? animationValue : 1,
                    },
                  ],
                },
              ]}
            >
              <Text style={[styles.fingerText]}>{finger.key}</Text>
            </Animated.View>
          ))}
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default App;
