import React from "react";
import { View, Image, TouchableOpacity } from "react-native";

import { ButtonStyles } from "../styles/button.styles";

const HelpButtonComponent = ({ setModalVisible }) => {
  const handlePress = () => {
    setModalVisible(true);
  };

  return (
    <TouchableOpacity style={ButtonStyles.button} onPress={handlePress}>
      <Image
        source={require("../assets/help.png")} // Reemplaza con la URL de tu imagen
        style={{ width: 50, height: 50, color: "orange" }}
      />
    </TouchableOpacity>
  );
};

export default HelpButtonComponent;
