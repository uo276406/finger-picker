import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  fingerText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 35,
  },
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
