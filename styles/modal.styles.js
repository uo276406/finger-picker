import { StyleSheet } from "react-native";

export const ModalStyles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "orange",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "black",
    color: "orange",
  },
  textStyle: {
    color: "orange",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
