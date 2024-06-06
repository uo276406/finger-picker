import { StyleSheet } from "react-native";

export const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  touchArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "space-between",
    paddingTop: 50,
    paddingRight: 20,
    maxHeight: 140,
    backgroundColor: "black",
  },
  initialTextStyle: {
    display: "flex",
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
});
