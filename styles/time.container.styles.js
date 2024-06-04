import { StyleSheet } from "react-native";

export const TimeContainerStyles = StyleSheet.create({
  timerContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    top: 10,
    left: 10,
    padding: 20,
  },
  timerText: {
    color: "orange",
    fontSize: 32,
  },
});
