import React, { useState, useEffect, useRef } from "react";
import { View, Dimensions, Animated, Button } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

import "./lang/i18n";

import { getRandomColor, toSeconds, getRandomNumber } from "./utils/utils";
import { AppStyles } from "./styles/app.styles";
import TimeContainerComponent from "./components/TimeContainerComponent";
import FingerTouchComponent from "./components/FingerTouchComponent";
import HelpModalComponent from "./components/HelpModalComponent";
import HelpButtonComponent from "./components/HelpButtonComponent";

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
  const [modalVisible, setModalVisible] = useState(true);

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
          setSelectedFinger(null);
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
      <View style={AppStyles.header}>
        <TimeContainerComponent
          timeoutLeft={timeoutLeft}
          setTimeoutLeft={setTimeoutLeft}
          fingers={fingers}
        />
        <HelpButtonComponent setModalVisible={setModalVisible} />
      </View>
      <PanGestureHandler onBegan={handleBeganGestureEvent}>
        <View style={AppStyles.touchArea}>
          <HelpModalComponent
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
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
