import { StyleSheet } from "react-native";

export const TimeContainerStyles = StyleSheet.create({
  timerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 8,
    margin: 20,
    backgroundColor: "transparent", // Add this line to make the background transparent
  },
  timerText: {
    color: "black",
    fontStyle: "bold",
    fontSize: 190,
  },
});
