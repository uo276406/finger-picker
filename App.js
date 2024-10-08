import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { View, Image, Animated, Text } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

import "./lang/i18n";
import "expo-dev-client";

import { getRandomColor, toSeconds, getRandomNumber } from "./utils/utils";
import { AppStyles } from "./styles/app.styles";
import TimeContainerComponent from "./components/TimeContainerComponent";
import FingerTouchComponent from "./components/FingerTouchComponent";
import HelpModalComponent from "./components/help/HelpModalComponent";
import HelpButtonComponent from "./components/help/HelpButtonComponent";
import StartButtonComponent from "./components/StartButtonComponent";
import HistoryButtonComponent from "./components/history/HistoryButtonComponent";
import HistoryModalComponent from "./components/history/HistoryModalComponent";

const animationTime = 2000;
const baseTimeoutRoulette = 3000;
const targetAnimationScale = 2.5;
const initialAnimationScale = 1;

let adUnitIdBannerFooter;
if (__DEV__) {
  adUnitIdBannerFooter = TestIds.BANNER;
} else {
  if (Platform.OS === "ios") {
    adUnitIdBannerFooter = "ca-app-pub-2908698308342404/7051188887";
  } else {
    adUnitIdBannerFooter = "ca-app-pub-2908698308342404/8626471927";
  }
}

const App = () => {
  const { t } = useTranslation();

  const animationValue = useRef(new Animated.Value(1)).current;
  const [timeoutLeft, setTimeoutLeft] = useState(
    toSeconds(baseTimeoutRoulette)
  );
  const [rouletteStarted, setRouletteStarted] = useState(false);
  const [fingers, setFingers] = useState([]);
  const [selectedFinger, setSelectedFinger] = useState(null);
  const [firstTouch, setFirstTouch] = useState(true);
  const [modalHelpVisible, setModalHelpVisible] = useState(true);
  const [modalHistoryVisible, setModalHistoryVisible] = useState(false);
  let history = useRef([]).current;

  const emphasisAnimation = useRef(new Animated.Value(1)).current;
  const bannerRef = useRef(null);

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
        let result = getRandomNumber(0, fingers.length - 1);
        history.push(result + 1);
        setSelectedFinger(fingers[result]);

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
        <HistoryButtonComponent
          setModalHistoryVisible={setModalHistoryVisible}
        />
        <HelpButtonComponent setModalHelpVisible={setModalHelpVisible} />
      </View>
      <PanGestureHandler onBegan={handleBeganGestureEvent}>
        <View style={AppStyles.touchArea}>
          <HelpModalComponent
            modalHelpVisible={modalHelpVisible}
            setModalHelpVisible={setModalHelpVisible}
          />
          <HistoryModalComponent
            modalHistoryVisible={modalHistoryVisible}
            setModalHistoryVisible={setModalHistoryVisible}
            history={history}
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
      <BannerAd
        unitId={adUnitIdBannerFooter}
        size={BannerAdSize.FULL_BANNER}
        ref={bannerRef}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </GestureHandlerRootView>
  );
};

export default App;
