import { StyleSheet } from "react-native";

export const ModalStyles = StyleSheet.create({
  modalView: {
    margin: 20,
    marginTop: 200,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 35,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
    maxHeight: 400,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 26,
    paddingVertical: 12,
    elevation: 2,
  },
  buttonClose: {
    display: "flex",
    backgroundColor: "white",
    marginTop: 15,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalHelpText: {
    marginBottom: 15,
    fontSize: 16,
    color: "white",
  },
  modalHistoryText: {
    marginBottom: 15,
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
  scrollHistory: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingBottom: 10,
  },
  historyItem: {
    marginBottom: 5,
    fontSize: 20,
    textAlign: "center",
    color: "black",
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },
});
