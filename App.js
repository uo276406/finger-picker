import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { View, Image, Animated, Text } from "react-native";
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

const animationTime = 2000;
const baseTimeoutRoulette = 3000;
const targetAnimationScale = 2.5;
const initialAnimationScale = 1;

const App = () => {
  const { t } = useTranslation();

  const animationValue = useRef(new Animated.Value(1)).current;
  const [timeoutLeft, setTimeoutLeft] = useState(
    toSeconds(baseTimeoutRoulette)
  );
  const [rouletteStarted, setRouletteStarted] = useState(false);
  const [fingers, setFingers] = useState([]);
  const [selectedFinger, setSelectedFinger] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);
  const [firstTouch, setFirstTouch] = useState(true);

  const emphasisAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(emphasisAnimation, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(emphasisAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [emphasisAnimation, rouletteStarted]);

  const handleBeganGestureEvent = (event) => {
    if (rouletteStarted) {
      return;
    }

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
          emphasisAnimation.setValue(1);
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
            <Animated.View
              style={[
                AppStyles.initialTextContainer,
                { transform: [{ scale: emphasisAnimation }] },
              ]}
            >
              <Text style={AppStyles.initialTextStyle}>
                {t("INITIAL_TEXT")}
              </Text>
              <Image
                source={require("./assets/hand-touch.png")}
                style={{ width: 100, height: 100 }}
              />
            </Animated.View>
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
        {!rouletteStarted && fingers.length > 0 ? (
          <StartButtonComponent setRouletteStarted={setRouletteStarted} />
        ) : (
          <></>
        )}
      </View>
    </GestureHandlerRootView>
  );
};

export default App;
