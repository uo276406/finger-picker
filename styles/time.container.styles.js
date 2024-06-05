import { StyleSheet } from "react-native";

export const TimeContainerStyles = StyleSheet.create({
  timerContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
    margin: 20,
    borderWidth: 4,
    borderColor: "orange",
    borderRadius: 26,
  },
  timerText: {
    color: "orange",
    fontSize: 32,
  },
});
