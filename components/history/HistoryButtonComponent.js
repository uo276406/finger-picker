import React from "react";
import { Image, TouchableOpacity } from "react-native";

import { ButtonStyles } from "../../styles/button.styles";

const HistoryButtonComponent = ({ setModalHistoryVisible }) => {
  const handlePress = () => {
    setModalHistoryVisible(true);
  };

  return (
    <TouchableOpacity style={ButtonStyles.button} onPress={handlePress}>
      <Image
        source={require("../../assets/history.png")} // Reemplaza con la URL de tu imagen
        style={{ width: 50, height: 50 }}
      />
    </TouchableOpacity>
  );
};

export default HistoryButtonComponent;
