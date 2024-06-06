import { StyleSheet } from "react-native";

export const TimeContainerStyles = StyleSheet.create({
  timerContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
    marginTop: 50,
    margin: 20,
  },
  timerText: {
    color: "white",
    fontStyle: "bold",
    fontSize: 42,
  },
});
