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
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 16,
    color: "white",
  },
});
