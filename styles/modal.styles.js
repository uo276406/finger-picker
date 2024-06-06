import { StyleSheet } from "react-native";

export const ModalStyles = StyleSheet.create({
  modalView: {
    margin: 20,
    marginTop: 200,
    backgroundColor: "black",
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
    paddingHorizontal: 26,
    paddingVertical: 12,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "white",
    color: "white",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 14,
    textAlign: "center",
    color: "white",
  },
});
