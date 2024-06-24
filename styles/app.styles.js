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
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingRight: 30,
    paddingLeft: 30,
    maxHeight: 140,
    backgroundColor: "black",
  },
  initialTextContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  initialTextStyle: {
    display: "flex",
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontSize: 26,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    maxHeight: 100,
    marginTop: 50,
    marginBottom: 50,
  },
});
