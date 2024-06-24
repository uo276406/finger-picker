import React from "react";
import { Image, TouchableOpacity } from "react-native";

import { ButtonStyles } from "../../styles/button.styles";

const HelpButtonComponent = ({ setModalHelpVisible }) => {
  const handlePress = () => {
    setModalHelpVisible(true);
  };

  return (
    <TouchableOpacity style={ButtonStyles.button} onPress={handlePress}>
      <Image
        source={require("../../assets/help.png")} // Reemplaza con la URL de tu imagen
        style={{ width: 50, height: 50 }}
      />
    </TouchableOpacity>
  );
};

export default HelpButtonComponent;
