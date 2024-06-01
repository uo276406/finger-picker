import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Animated,
  Alert,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

import { getRandomColor } from "./utils/utils";

const { width, height } = Dimensions.get("window");

const App = () => {
  const [fingers, setFingers] = useState([]);
  const [selectedFinger, setSelectedFinger] = useState(null);
  const animationValue = useRef(new Animated.Value(1)).current;

  const handleBeganGestureEvent = (event) => {
    const { x, y } = event.nativeEvent;
    const numberOfPointers = fingers.length + 1;

    setFingers((prevFingers) => {
      const updatedFingers = [
        ...prevFingers,
        { key: numberOfPointers, x, y, color: getRandomColor() },
      ];
      console.log("updatedFingers", updatedFingers);
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
            toValue: 2,
            duration: 2500,
            useNativeDriver: true,
          }),
          Animated.timing(animationValue, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setFingers([]);
        });
      }, 5000);
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
              <Text style={[styles.text]}>{finger.key}</Text>
            </Animated.View>
          ))}
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchArea: {
    flex: 1,
    backgroundColor: "black",
  },
  finger: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center", // Alineación horizontal centrada
    textAlignVertical: "center", // Alineación vertical centrada
    fontSize: 35,
  },
  highlighted: {
    backgroundColor: "yellow",
  },
});

export default App;
