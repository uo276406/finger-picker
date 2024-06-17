import React, { useState, useEffect, useRef } from "react";
import { View, Dimensions, Animated, Text } from "react-native";
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
import StartButtonComponent from "./components/StartButtonComponent";

const { width, height } = Dimensions.get("window");
const animationTime = 2000;
const baseTimeoutRoulette = 3000;
const targetAnimationScale = 2.5;
const initialAnimationScale = 1;

const App = () => {
  const animationValue = useRef(new Animated.Value(1)).current;
  const [timeoutLeft, setTimeoutLeft] = useState(
    toSeconds(baseTimeoutRoulette)
  );
  const [rouletteStarted, setRouletteStarted] = useState(false);
  const [fingers, setFingers] = useState([]);
  const [selectedFinger, setSelectedFinger] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);
  const [firstTouch, setFirstTouch] = useState(true);

  const handleBeganGestureEvent = (event) => {
    const { x, y } = event.nativeEvent;

    setFingers((prevFingers) => {
      const updatedFingers = [
        ...prevFingers,
        { key: fingers.length + 1, x, y, color: getRandomColor() },
      ];
      setFirstTouch(false);
      return updatedFingers;
    });
  };

  useEffect(() => {
    let timeoutId;

    if (rouletteStarted && fingers.length > 0) {
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
          setFirstTouch(true);
          setRouletteStarted(false);
        });
      }, baseTimeoutRoulette);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [fingers, rouletteStarted]);

  return (
    <GestureHandlerRootView style={AppStyles.container}>
      <View style={AppStyles.header}>
        <HelpButtonComponent setModalVisible={setModalVisible} />
      </View>
      <PanGestureHandler onBegan={handleBeganGestureEvent}>
        <View style={AppStyles.touchArea}>
          <HelpModalComponent
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          {firstTouch ? (
            <Text style={AppStyles.initialTextStyle}>Haga click</Text>
          ) : (
            <>
              {fingers.map((finger) => (
                <FingerTouchComponent
                  key={finger.key}
                  finger={finger}
                  selectedFinger={selectedFinger}
                  animationValue={animationValue}
                />
              ))}
            </>
          )}
        </View>
      </PanGestureHandler>
      {rouletteStarted && timeoutLeft > 0 && (
        <TimeContainerComponent
          timeoutLeft={timeoutLeft}
          setTimeoutLeft={setTimeoutLeft}
          fingers={fingers}
          rouletteStarted={rouletteStarted}
        />
      )}
      <View style={AppStyles.footer}>
        {!rouletteStarted && fingers.length >= 0 && (
          <StartButtonComponent setRouletteStarted={setRouletteStarted} />
        )}
      </View>
    </GestureHandlerRootView>
  );
};

export default App;
